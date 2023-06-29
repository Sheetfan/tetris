class Game{
    constructor(){
        //game objects
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.gameContainer = new GameContainer(this);
        this.tetromino = new Tetromino(this);
        this.gameAssets = [this.gameContainer,this.tetromino];
    }
    update(){
        for(let i = 0; i < this.tetromino.currentTetromino.length; i++){
            for(let k = 0; k < this.tetromino.currentTetromino[i].length; k++){
                if(this.tetromino.currentTetromino[i][k] !== "0"){
                    const futuretTetrominoY = i + this.tetromino.y + 1; 
                    if(futuretTetrominoY >= this.gameContainer.rowLength){
                        this.tetromino.stopMoveingDown();
                    }
                }
            }
        } 
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