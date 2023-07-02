class Game{
    constructor(){
        // Game objects
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
                    if(futuretTetrominoY >= rowLength || blocksArray[futuretTetrominoY][tetrominoX] !== "0"){
                        this.tetromino.stopMoveingDown();
                        this.gameContainer.addToBlocksArray();
                        this.tetromino.makeNewTetromio(this);
                        this.checkTetris();
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
        
    checkTetris(){
        let {blocksArray,columnsLength,rowLength} = this.gameContainer;
        let countColumns = 0;
        let howManylines = 0; // To track how many row to shift down by

        blocksArray.forEach(row =>{
            row.forEach(block =>{
                if(block !== "0"){
                    countColumns++;
                }
            })
            if(countColumns === columnsLength){
                row.fill("0");
                howManylines++;
            }
            countColumns = 0;
        });

        // To shift the blockArray down 
        if(howManylines > 0){
            const rows = rowLength;
            const cols = columnsLength;
          
            // Create a new array of the same size as a place holder
            let shiftedArr = blocksArray.map((subArray) => subArray.slice());

            for(let i = 0; i < rows - howManylines; i++){
                for(let k = 0; k < cols; k++){
                    shiftedArr[i + howManylines][k] = blocksArray[i][k];
                }
            }
            this.gameContainer.blocksArray = shiftedArr;
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