class GameContainer{
    constructor(game){
        this.game = game;
        this.blockSize = 28;
        this.rowLength = 20;
        this.columnsLength = 10;

        // make the array tiles
        this.gridArray = [];
        this.clearGridArray();

        // will save all the placed block positions
        this.blocksArray = [];
        this.clearBlocksArray();

        this.height = this.blockSize * this.rowLength;
        this.width = this.blockSize * this.columnsLength;

        // set screen to the middle
        this.x = (this.game.gameWidth - this.width) / 2;
        this.y = (this.game.gameHeight - this.height) / 2;
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
    addToBlocksArray(){
        let {currentTetromino,y,x} = this.game.tetromino;
        for(let i = 0; i < currentTetromino.length; i++){
            for(let k = 0; k < currentTetromino[i].length; k++){
                if(currentTetromino[i][k] !== "0"){
                    this.blocksArray[y + i][x + k] = currentTetromino[i][k];
                }
            }
        }
    }
    update(){
        this.clearGridArray();
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