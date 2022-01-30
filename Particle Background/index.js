window.onload = () => {
    generateParticles();
};

function generateParticles () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var prevDivs = document.querySelectorAll('div');
    prevDivs.forEach(div => {
        div.remove();
    });
    console.log("Yes");
    var body = document.querySelector('body');
    var maxTime = 0;
    for (let i=0; i<20; i++){
        var div = document.createElement('div');
        div.style.position = "absolute";
        div.style.height = "4px";
        div.style.width = "4px";
        div.style.transform = "translate("+(Math.random()*width-8)+"px, "+(Math.random()*height-8)+"px)";
        var duration =  Math.floor(Math.random()*4000+3000);
        var delay = Math.random()*2000;
        div.style.animationDuration = duration+"ms";
        div.style.animationDelay = delay+"ms";

        if (maxTime < duration+delay)
        {maxTime = duration+delay;}
        body.appendChild(div);
        
    }
    var time = (Math.random()*8000)+1000;
    setTimeout(generateParticles, maxTime);
    animateBlocks(maxTime, height, width);
}

function animateBlocks(time, height, width){
    anime({
        targets: 'div',
        translateX: function(el, i) {
            return anime.random(-width/40,width/40) * i;
        },
        translateY: function(el, i) {
            return anime.random(-height/40,height/40) * i;
          },
        easing: 'linear',
        duration: time,
        

    })
}

//'cubicBezier('+Math.random()+', '+Math.random()+', '+Math.random()+', '+Math.random()+')'