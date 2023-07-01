class Game{
    constructor(){
        //game objects
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.gameContainer = new GameContainer(this);
        this.tetromino = new Tetromino(this);
        this.gameAssets = [this.gameContainer,this.tetromino];
    }
    tetrominoCollision(){
        let flag = false;
        let {currentTetromino,y,x} = this.tetromino;
        let {rowLength,blocksArray} = this.gameContainer;
        for(let i = 0; i < currentTetromino.length; i++){
            for(let k = 0; k < currentTetromino[i].length; k++){
                if(currentTetromino[i][k] !== "0"){
                    let tetrominoY = i + y;
                    let tetrominoX = k + x;
                    let futuretTetrominoY = tetrominoY  + 1; 
                    if(futuretTetrominoY >= rowLength){
                        this.tetromino.stopMoveingDown();
                        this.gameContainer.addToBlocksArray();
                        this.tetromino.makeNewTetromio(this);
                        flag = true;
                        break;
                    }
                    if(blocksArray[futuretTetrominoY][tetrominoX] !== "0"){
                        this.tetromino.stopMoveingDown();
                        this.gameContainer.addToBlocksArray();
                        this.tetromino.makeNewTetromio(this);
                        flag = true;
                        break;
                    }                     
                }
            }
            if (flag){
                break;
            }
        }
    }
        
    update(){ 
        this.gameAssets.forEach((gameAsset)=>{
            gameAsset.update();
        });

        this.tetrominoCollision();
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