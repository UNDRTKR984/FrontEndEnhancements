window.onload = () =>{
    var suns = document.getElementsByTagName("i");

    Array.from(suns).forEach(sun => sun.style.animationDuration = Math.floor(Math.random()*4000+750)+"ms");
};
    
