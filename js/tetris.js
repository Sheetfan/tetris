let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');

// defining the game width and height
canvas.width = innerWidth;
canvas.height = innerHeight;



let previousTimestamp = performance.now();

window.addEventListener("DOMContentLoaded",()=>{
    let game = new Game();
    game.run();
});