var canvas, context;
window.onload = function () {
    canvas = document.getElementById("gameScreen");
    context = canvas.getContext("2d");

    document.addEventListener('keydown', keyPressed);
    //document.addEventListener('keyup', keyReleased);

    var framesPerSecond = 45;
    setInterval(gamePlay, 1000 / framesPerSecond);
}

function keyPressed(e){
    console.log(e["key"]);
    if (e["key"]=="ArrowLeft"){
        fPlayerA -= 0.05;
    }
    else if (e["key"]=="ArrowRight"){
        fPlayerA += 0.05;
    }
    else if (e["key"]=="ArrowUp"){
        fPlayerX += Math.sin(fPlayerA) * 0.1;
        fPlayerY += Math.cos(fPlayerA) * 0.1;

        if (map[findIndex(Math.round(fPlayerX),Math.round(fPlayerY))]=='#'){
            fPlayerX -= Math.sin(fPlayerA) * 0.1;
            fPlayerY -= Math.cos(fPlayerA) * 0.1;
        }
    }
    else if (e["key"]=="ArrowDown"){
        fPlayerX -= Math.sin(fPlayerA) * 0.1;
        fPlayerY -= Math.cos(fPlayerA) * 0.1;

        if (map[findIndex(Math.round(fPlayerX),Math.round(fPlayerY))]=='#'){
            fPlayerX += Math.sin(fPlayerA) * 0.1;
            fPlayerY += Math.cos(fPlayerA) * 0.1;
        }
    }
    else if (e["key"]=="z"){
        fPlayerX += Math.sin(fPlayerA-90) * 0.1;
        fPlayerY += Math.cos(fPlayerA-90) * 0.1;

        if (map[findIndex(Math.round(fPlayerX),Math.round(fPlayerY))]=='#'){
            fPlayerX -= Math.sin(fPlayerA-90) * 0.1;
            fPlayerY -= Math.cos(fPlayerA-90) * 0.1;
        }
    }

    else if (e["key"]=="c"){
        fPlayerX -= Math.sin(fPlayerA-90) * 0.1;
        fPlayerY -= Math.cos(fPlayerA-90) * 0.1;

        if (map[findIndex(Math.round(fPlayerX),Math.round(fPlayerY))]=='#'){
            fPlayerX += Math.sin(fPlayerA-90) * 0.1;
            fPlayerY += Math.cos(fPlayerA-90) * 0.1;
        }
    }
}

const nScreenWidth = 320;
const nScreenHeight = 180;



var screen = new Array(nScreenWidth * nScreenHeight);


var fPlayerX = 8.0;
var fPlayerY = 8.0;
var fPlayerA = 0.0;

var nMapHeight = 16;
var nMapWidth = 16;

var fieldOfView = 3.14159 / 4.0;
var fDepth = 17;

var map = "";
map += "################";
map += "#..............#";
map += "#...#####......#";
map += "#..............#";
map += "#..............#";
map += "#...#..........#";
map += "#..............#";
map += "#..............#";
map += "#........#.....#";
map += "#........#.....#";
map += "#........#.....#";
map += "#........#.....#";
map += "#......###.....#";
map += "#..............#";
map += "#..............#";
map += "################";

var canvas, context;

function gamePlay(){
    // drawRectangle(0, 0, canvas.width, canvas.height, "black");
    // drawRectangle(1,1,1,1,"white");
    // drawRectangle(2,2,5,5,"white");
    for (var x=0; x < nScreenWidth; x++){
        var fRayAngle = (fPlayerA - fieldOfView / 2.0) + (x / nScreenWidth) * fieldOfView;

        var fDistanceToWall = 0;
        var hitwall = false;
        var boundry = false;

        var green = false;

        var fEyeX = Math.sin(fRayAngle);
        var fEyeY = Math.cos(fRayAngle);

        while(!hitwall && fDistanceToWall < fDepth){
            fDistanceToWall += 0.1;
            var nTextX = Math.round(fPlayerX+fEyeX*fDistanceToWall);
            var nTextY = Math.round(fPlayerY+fEyeY*fDistanceToWall);

            if (nTextX < 0 || nTextX >= nMapWidth || nTextY < 0 || nTextY >= nMapHeight){
                hitwall = true;
                fDistanceToWall = fDepth;
            }
            else {
                if (map[nTextY*nMapWidth + nTextX] == '#'){
                    hitwall = true;

                    var p = [];
                    for (var tx = 0; tx < 2; tx++){
                        for (var ty = 0; ty < 2; ty++){
                            var vy = nTextY + ty - fPlayerY;
                            var vx = nTextX + tx - fPlayerX;
                            var d = Math.sqrt(vx*vx + vy*vy);
                            var dot = (fEyeX*vx / d) + (fEyeY * vy / d);
                            p.push([d, dot]);
                        }
                    }

                    p.sort(function compare(first, second){
                        return first[0] - second[0];
                    })

                

                    var fBound = 0.0025;
                    if(Math.acos(p[0][1]) < fBound){
                        boundry = true;
                    }
                    if(Math.acos(p[1][1]) < fBound){
                        boundry = true;
                    }
                    

                }
                if (map[nTextY*nMapWidth + nTextX] == 'W'){
                    hitwall = true;
                    green = true;
                }
            }
        }

        //Calculate the distance to ceiling and floor
        var nCeiling = (nScreenHeight/2.0) - (nScreenHeight / fDistanceToWall);
        var nFloor = nScreenHeight - nCeiling;

        

        

        for (var y=0; y < nScreenHeight; y++){
            var color = "#000000";
            if (y < nCeiling){
                screen[y*nScreenWidth + x] = "black";
                drawRectangle(x, y, 1, 1, color);
            }
            else if(y > nCeiling && y <= nFloor){
                screen[y*nScreenWidth + x] = "white";
                
                if (fDistanceToWall <= fDepth / 4.0){
                    color = "#FFFFFF";
                }
                else if (fDistanceToWall < fDepth / 3.5 ){
                    color = color = "#F2F2F2";
                }
                else if (fDistanceToWall < fDepth / 3 ){
                    color = color = "#E6E6E6";
                }
                else if (fDistanceToWall < fDepth / 2.5 ){
                    color = "#D9D9D9";
                }
                else if (fDistanceToWall < fDepth / 2){
                    color = "#CCCCCC";
                }
                else if (fDistanceToWall < fDepth / 1.5){
                    color = "#BFBFBF";
                }
                else if (fDistanceToWall < fDepth){
                    color = "#B3B3B3";
                }

                if (boundry){
                    color = "black";
                }
                if (green){
                    color = "green";
                }
                drawRectangle(x, y, 1, 1, color);
            }
            else {
                screen[y*nScreenWidth + x] = "black";
                var b = 1 - (y-nScreenHeight/2)/(nScreenHeight/2);
                if (b < 0.25){
                    color = "#666666";
                }
                else if (b < 0.5){
                    color = "#4D4D4D";
                }
                else if (b < 0.75){
                    color = "#333333";
                }
                else if (b < 0.9){
                    color = "#1A1A1A";
                }
                drawRectangle(x, y, 1, 1, color);
            }
        }

    }
}





// helper function to draw rectangles to screen
function drawRectangle(topX, topY, bottomX, bottomY, color) {
    context.fillStyle = color;
    context.fillRect(topX, topY, bottomX, bottomY);
}

// finds the index of the space in the array
function findIndex(x, y) {
    return x + nMapWidth * y;
}

function drawLevel(){
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
            var arrayIndex = findIndex(eachCol, eachRow);
        }
    }
}