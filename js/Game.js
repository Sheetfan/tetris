class Game{
    constructor(){
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.gameContainer = new GameContainer(this);
        this.gameAssets = [this.gameContainer];

    }

    update(){

    }
    draw(){
        this.gameAssets.forEach((gameAsset)=>{
            gameAsset.draw();
        })
    }
    run(){
        this.update();
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }
}