class Game{
    constructor(){
        // Game objects
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.gameContainer = new GameContainer(this);
        this.gameAssets = [this.gameContainer];
    }
    
    update(){ 
        this.gameAssets.forEach((gameAsset)=>{
            gameAsset.update();
        });
    }
    draw(){
        ctx.clearRect(0,0,this.gameWidth,this.gameHeight);
        this.gameAssets.forEach((gameAsset)=>{
            gameAsset.draw();
        });
    }
    run(){
        this.update();
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }
}