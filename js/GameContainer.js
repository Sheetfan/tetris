class GameContainer{
    constructor(game){
        this.game = game;
        this.blockSize = 28;
        this.rowLength = 20;
        this.columnsLength = 10;

        this.tetromino = new Tetromino(this);

        // Make the array tiles
        this.gridArray = [];
        this.clearGridArray();

        // Will save all the placed block positions
        // this.blocksArray = [
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["0","0","0","0","0","0","0","0","0","0"],
        //     ["1","1","1","1","1","0","0","0","1","0"],
        //     ["0","1","0","1","0","1","0","1","1","0"],
        //     ["1","1","1","1","1","1","0","1","1","0"],
        //     ["1","1","1","1","1","1","1","1","1","0"]
        // ];
        this.clearBlocksArray();

        this.height = this.blockSize * this.rowLength;
        this.width = this.blockSize * this.columnsLength;

        // Set screen to the middle
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
        let {currentTetromino,y,x} = this.tetromino;
        for(let i = 0; i < currentTetromino.length; i++){
            for(let k = 0; k < currentTetromino[i].length; k++){
                if(currentTetromino[i][k] !== "0"){
                    this.blocksArray[y + i][x + k] = currentTetromino[i][k];
                }
            }
        }
    }

    // tetrominoCollision(){
    //     let futureTetrominoPos = this.tetromino.futureTetrominoPos(0,1);
    //     for(let i = 0; i < futureTetrominoPos.length; i++){
    //         let {futuretX,futuretY} = futureTetrominoPos[i]; 
    //         if(futuretY >= this.rowLength || this.blocksArray[futuretY][futuretX] !== "0"){
    //             this.tetromino.stopMoveingDown();
    //             this.addToBlocksArray();
    //             this.tetromino.makeNewTetromio(this);
    //             this.checkTetris();
    //             break;
    //         }
    //     }
    // }
    // checkTetris(){
    //     let countColumns = 0;
    //     let howManylines = 0; // To track how many row to shift down by
    //     let startingline = 0;
    //     let i = this.rowLength - 1;

    //     this.blocksArray.forEach(row =>{
    //         row.forEach(block =>{
    //             if(block !== "0"){
    //                 countColumns++;
    //             }
    //         })
    //         if(countColumns === this.columnsLength){
    //             row.fill("0");
    //             howManylines++;
    //             startingline = i;
    //         }
    //         countColumns = 0;
    //         i--;
    //     });

    //     // To shift the blockArray down 
    //     if(howManylines > 0){
    //         const rows = this.rowLength;
    //         const cols = this.columnsLength;
          
    //         // Create a new array of the same size as a place holder
    //         let shiftedArr = this.blocksArray.map((subArray) => subArray.slice());

    //         for(let i = 0; i < rows - (howManylines + startingline); i++){
    //             for(let k = 0; k < cols; k++){
    //                 shiftedArr[i + howManylines][k] = this.blocksArray[i][k];
    //             }
    //         }
    //         this.blocksArray = shiftedArr;
    //     }
    // }
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
        this.tetromino.update();
        //this.tetrominoCollision();
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