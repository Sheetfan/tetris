class Tetromino{
    static tetrominos = [
        //I
        [
            ["0","0","0","0"],
            ["1","1","1","1"],
            ["0","0","0","0"],
            ["0","0","0","0"],
        ],
        //J
        [
            ["2","0","0"],
            ["2","2","2"],
            ["0","0","0"]
        ],
        //L
        [
            ["0","0","3"],
            ["3","3","3"],
            ["0","0","0"]
        ],
        //O
        [
            ["0","4","4","0"],
            ["0","4","4","0"],
            ["0","0","0","0"]
        ],
        //S
        [
            ["0","5","5"],
            ["5","5","0"],
            ["0","0","0"]
        ],
        //T
        [
            ["0","6","0"],
            ["6","6","6"],
            ["0","0","0"]
        ],
        //Z
        [
            ["7","7","0"],
            ["0","7","7"],
            ["0","0","0"]
        ]
        
    ];
    static tetrominosColour = [
        "cyan", //I
        "blue", //J
        "orange", //L
        "yellow", //O
        "green", //S
        "purple", //T
        "red" //Z
    ];
    constructor(gameContainer){
        this.makeNewTetromio(gameContainer);
    }
    makeNewTetromio(gameContainer){
        this.gameContainer = gameContainer;
        let random = Tetromino.tetrominos[Math.floor(Math.random() * 7)];
        this.currentTetromino = random.map((subArray) => subArray.slice());
        this.x = 3;
        this.y = 0;        
        this.timeoutid = 0;
        this.movementDownId = setInterval(this.moveDown.bind(this), 1000);
        this.horizontalMovementId = 0;
        this.isKeyPressed = false;
        this.isKeyPressedhorizontal = false;
        this.refmovement = this.movement.bind(this);
        this.refmovementUp = this.movementButtonUp.bind(this);
        window.addEventListener("keydown",this.refmovement);
        window.addEventListener("keyup", this.refmovementUp);
    }
    movement(e){
        const timerOutinterval = 100;
        const horizontalInterval = 100;
        const downInterval = 50;
            // if (e.defaultPrevented) {
            //     this.isKeyPressed = true;
            //     return; // Do nothing if the event was already processed
            // }

        // Spins the tetroino
        if((e.key === "Up" || e.key === "ArrowUp") && !this.isKeyPressed){
            this.rotateTetroino();
            this.isKeyPressed = true;
        }

        // Moves the tetroino down faster
        if((e.key === "Down" || e.key === "ArrowDown") && !this.isKeyPressed){
            clearInterval(this.movementDownId);
            this.moveDown();
            this.movementDownId = setInterval(this.moveDown.bind(this), downInterval);
            this.isKeyPressed = true;
        }
    
        // Moves the tetroino to the left
        if((e.key === "Left" || e.key === "ArrowLeft") && !this.isKeyPressedhorizontal){
            this.moveLeft();
            this.timeoutid = setTimeout(() => {
                this.horizontalMovementId = setInterval(this.moveLeft.bind(this), horizontalInterval);
            },timerOutinterval);
            this.isKeyPressedhorizontal = true;
        }
        // Moves the tetroino to the right
        else if((e.key === "Right" || e.key === "ArrowRight") && !this.isKeyPressedhorizontal){
            this.moveRight();
            this.timeoutid = setTimeout(() => {
                this.horizontalMovementId = setInterval(this.moveRight.bind(this),  horizontalInterval);
            },timerOutinterval);
            this.isKeyPressedhorizontal = true;
        }
    }
    movementButtonUp(e){
        if((e.key === "Up" || e.key === "ArrowUp") && this.isKeyPressed){
            this.isKeyPressed = false;
        }
        if((e.key === "Down" || e.key === "ArrowDown") && this.isKeyPressed) {
            this.isKeyPressed = false;
            clearInterval(this.movementDownId);
            this.movementDownId = setInterval(this.moveDown.bind(this), 1000);
        }
        if((e.key === "Left" || e.key === "ArrowLeft" || e.key === "Right" || e.key === "ArrowRight")
                && this.isKeyPressedhorizontal){
            this.isKeyPressedhorizontal = false;
            clearTimeout(this.timeoutid);
            clearInterval(this.horizontalMovementId);
        }
    }
    moveDown(){
        this.y++;
    }
    stopMoveingDown(){
        window.removeEventListener("keydown", this.refmovement);
        window.removeEventListener("keyup", this.refmovementUp);
        clearTimeout(this.timeoutid);
        clearInterval(this.horizontalMovementId);
        clearInterval(this.movementDownId);
    }
    moveRight(){
        if(this.canMoveRight()){
            this.x++;
        }
        
    }
    moveLeft(){
        if(this.canMoveLeft()){
            this.x--;
        }
        
    }
    updateTetromino(){
        let {gridArray} =  this.gameContainer;
        let futureTetrominoPos = this.futureTetrominoPos(0,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX ,futuretY} = futureTetrominoPos[i];
            gridArray[futuretY][futuretX] = this.currentTetromino[futuretY - this.y][futuretX - this.x];
        } 
    }

    canMoveLeft(){
        let futureTetrominoPos = this.futureTetrominoPos(-1,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretX < 0 || this.gameContainer.blocksArray[futuretY][futuretX] !== "0"){
                return false; 
            }
        }
        return true;
    }
    futureTetrominoPos(diffX,diffy){
        let futureTetrominoPos = [];
        for(let i = 0; i < this.currentTetromino.length; i++){
            for(let k = 0; k < this.currentTetromino[i].length; k++){
                if(this.currentTetromino[i][k] !== "0"){
                    let tetrominoY = i + this.y;
                    let tetrominoX = k + this.x;
                    let futuretX = tetrominoX + diffX;
                    let futuretY = tetrominoY + diffy;
                    futureTetrominoPos.push({futuretX, futuretY});
                }
            }
        }
        return futureTetrominoPos;
    }
    canMoveRight(){
        let futureTetrominoPos = this.futureTetrominoPos(1,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretX >= this.gameContainer.columnsLength || this.gameContainer.blocksArray[futuretY][futuretX] !== "0"){
                return false; 
            }
        }
        return true;
    }
    canRotate(){
        const numRows = this.currentTetromino.length; 
        const numCols = this.currentTetromino[0].length;
        let array = this.currentTetromino.map((subArray) => subArray.slice());
        let futureRotatePos = [];
        //for square matrix
        if(numRows === numCols){
            // Transpose the array
            for (let i = 0; i < numRows; i++) {
                for (let j = i + 1; j < numCols; j++) {
                    [array[i][j], array[j][i]] = [array[j][i], array[i][j]];
                }
            }

            // Reverse each row
            for (let i = 0; i < numRows; i++) {
                array[i].reverse();
            }
            for (let i = 0; i < numRows; i++) {
                for (let k = 0; k < numCols; k++) {
                    if(array[i][k] !== "0"){
                        let tetrominoY = i + this.y;
                        let tetrominoX = k + this.x;
                        futureRotatePos.push({tetrominoX,tetrominoY});
                    }
                }
            }
            for(let i = 0; i < futureRotatePos.length; i++){
                let {tetrominoX,tetrominoY} = futureRotatePos[i]; 
                if(tetrominoX >= this.gameContainer.columnsLength || tetrominoX < 0 ||
                    tetrominoY >= this.rowLength || this.gameContainer.blocksArray[tetrominoY][tetrominoX] !== "0"){
                    return false; 
                }
            }
        }
        
        return true;
    }
    rotateTetroino(){
        if(this.canRotate()){
            const numRows = this.currentTetromino.length; 
            const numCols = this.currentTetromino[0].length;
            //for square matrix
            if(numRows === numCols){
                // Transpose the array
                for (let i = 0; i < numRows; i++) {
                    for (let k = i + 1; k < numCols; k++) {
                        [this.currentTetromino[i][k], this.currentTetromino[k][i]] = [this.currentTetromino[k][i], this.currentTetromino[i][k]];
                    }
                }

                // Reverse each row
                for (let i = 0; i < numRows; i++) {
                    this.currentTetromino[i].reverse();
                }
            }
        }
    
        // this.updateTetromino();
    }

    update(){      
        this.updateTetromino();
    }

    draw(){

    }
}