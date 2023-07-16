class GameContainer{
    constructor(game){
        this.game = game;
        this.blockSize = 28;
        this.rowLength = 20;
        this.columnsLength = 10;

        // Make the array tiles
        this.gridArray = [];
        this.clearGridArray();

        // Will save all the placed block positions
        // this.blocksArray = [
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["0","0","0","0","5","0","0","0","0","0"],
        //     ["1","1","1","1","1","0","0","0","1","0"],
        //     ["0","1","0","1","0","1","0","1","1","0"],
        //     ["1","1","1","1","1","1","0","1","1","0"],
        //     ["1","1","1","1","1","1","1","1","1","0"]
        // ];
        this.blocksArray = [];
        this.clearBlocksArray();

        // 
        this.bufferArray = [];
        this.clearBufferArray();

        this.height = this.blockSize * this.rowLength;
        this.width = this.blockSize * this.columnsLength;

        // Set screen to the middle
        this.x = game.y + 0;
        this.y = game.x + 0;

        this.tetromino = new Tetromino(this);
    }
    isGameOver(){
        let {currentTetromino,y,x} = this.tetromino;
        let futureTetrominoPos = this.tetromino.futureTetrominoPos(currentTetromino,0,0);
        let counter = 0;
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i];
            if(futuretY < 0){
                counter++;
            }  
        }
        return futureTetrominoPos.length === counter;
    }
    clearBlocksArray(){
        this.blocksArray = [];
        for(let i = 0; i < this.rowLength; i++){
            let row = [];
            for(let k = 0; k < this.columnsLength; k++){
                row.push("0");
            }
            this.blocksArray.push(row);
        }
    }
    clearGridArray(){
        this.gridArray = [];
        for(let i = 0; i < this.rowLength; i++){
            let row = [];
            for(let k = 0; k < this.columnsLength; k++){
                row.push("0");
            }
            this.gridArray.push(row);
        }
    }

    clearBufferArray(){
        this.bufferArray = [];
        for(let i = 0; i < this.rowLength; i++){
            let row = [];
            for(let k = 0; k < this.columnsLength; k++){
                row.push("0");
            }
            this.bufferArray.push(row);
        }
    }
    addToBlocksArray(){
        let {currentTetromino,y,x} = this.tetromino;
        let futureTetrominoPos = this.tetromino.futureTetrominoPos(currentTetromino,0,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i];
            if(futuretY >= 0){
                this.blocksArray[futuretY][futuretX] = currentTetromino[futuretY - y][futuretX - x];
            }  
        }
    }

    clearLines(){
        let clearedGrid = [];
        let rowsCleared = 0;
        
        for (let row = this.rowLength - 1; row >= 0; row--) {
            if ( this.blocksArray[row].every(cell => cell !== "0")) {
                rowsCleared++;
            } 
            else {
                clearedGrid.unshift(this.blocksArray[row]);
            }
        }
        
        for (let i = 0; i < rowsCleared; i++) {
            clearedGrid.unshift(Array(this.columnsLength).fill("0"));
        }
        
        this.blocksArray = clearedGrid;
    }
    update(){
        this.clearGridArray();
        this.clearBufferArray();
        this.tetromino.update();
    }

    draw(){
        //Draws the blocks
        // //Draws the row lines
        // for(let i = 0; i < this.rowLength; i++){
        //     ctx.moveTo(this.x, this.y + (i* this.blockSize));
        //     ctx.lineTo(this.x + this.width , this.y + (i*this.blockSize));
        //     ctx.stroke();
        // }
        // //Draws the columns lines
        // for(let k = 0; k < this.columnsLength; k++){
        //     ctx.moveTo(this.x + (k * this.blockSize),this.y);
        //     ctx.lineTo(this.x + (k * this.blockSize), this.y + this.height);
        //     ctx.stroke();
        // }
        
        // ctx.fillRect(this.x + (this.game.block.x * this.blockSize),this.y + (this.game.block.y * this.blockSize),this.blockSize,this.blockSize);
        let twoArrays = [this.gridArray,this.blocksArray];
        twoArrays.forEach(array =>{
            for(let i = 0; i < this.rowLength; i++){
                for(let k = 0; k < this.columnsLength; k++){
                    if(array[i][k] !== "0"){
                        switch(array[i][k]){
                            case "1":
                                ctx.fillStyle = Tetromino.tetrominosColour[0];
                                break;
                            case "2":
                                ctx.fillStyle = Tetromino.tetrominosColour[1];
                                break;
                            case "3":
                                ctx.fillStyle = Tetromino.tetrominosColour[2];
                                break;
                            case "4":
                                ctx.fillStyle = Tetromino.tetrominosColour[3];
                                break;
                            case "5":
                                ctx.fillStyle = Tetromino.tetrominosColour[4];
                                break;
                            case "6":
                                ctx.fillStyle = Tetromino.tetrominosColour[5];
                                break;
                            case "7":
                                ctx.fillStyle = Tetromino.tetrominosColour[6];
                                break;
                            case "8":
                                ctx.fillStyle = Tetromino.tetrominosColour[7];
                        }
                        ctx.fillRect(this.x + (this.blockSize*k),this.y + (this.blockSize*i),this.blockSize,this.blockSize);
    
                        // Draws the black border
                        ctx.strokeStyle = "black";
                        ctx.strokeRect(this.x + (this.blockSize*k),this.y + (this.blockSize*i),this.blockSize,this.blockSize);
                    }
                }
            }
        });

        // Draws the outside border
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}