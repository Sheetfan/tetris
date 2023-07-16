class Game{
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    constructor(){
        // Game objects
        this.x = 0;
        this.y = 0;
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.font = "16px Arial";

        this.rightContainer = new RightContainer(this);
        this.gameContainer = new GameContainer(this);
        //TODO add the left Container class after the right container

        this.gameAssets = [this.gameContainer,this.rightContainer];
        this.centerContainer();
    }
    centerContainer(){
        let totalWidth = this.rightContainer.width + this.gameContainer.width;
        let totalHeight = this.gameContainer.height;

        this.x = (this.gameWidth / 2) - (totalWidth / 2);
        this.y = (this.gameHeight / 2) - (totalHeight / 2);

        this.gameContainer.x = this.x;
        this.gameContainer.y = this.y;

        this.rightContainer.x = this.x + 280;
        this.rightContainer.y = this.y;
    }
    reset(){
        this.gameContainer = {};
        this.rightContainer ={};
        this.gameAssets = [];
        this.rightContainer = new RightContainer(this);
        this.gameContainer = new GameContainer(this);

        this.gameAssets = [this.gameContainer,this.rightContainer];
        this.centerContainer();
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