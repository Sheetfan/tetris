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
        "cyan",
        "blue",
        "orange",
        "yellow",
        "green",
        "purple",
        "red"
    ];
    constructor(game){
        this.makeNewTetromio(game);
    }
    makeNewTetromio(game){
        this.game = game;
        let random = Tetromino.tetrominos[Math.floor(Math.random() * 7)];
        this.currentTetromino = random.map((subArray) => subArray.slice());
        this.x = 3;
        this.y = 0;
        // this.futurex = 0;
        // this.futurey = 0;
        
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
        // for(let i = 0; i < this.game.gameContainer.gridArray.length; i++){
        //     console.log(this.game.gameContainer.blocksArray);
        // }
        // console.log(" ");
    }
    stopMoveingDown(){
        window.removeEventListener("keydown", this.refmovement);
        window.removeEventListener("keyup", this.refmovementUp);
        clearTimeout(this.timeoutid);
        clearInterval(this.horizontalMovementId);
        clearInterval(this.movementDownId);
    }
    moveRight(){
        this.x++;
    }
    moveLeft(){
        this.x--;
    }
    updateTetromino(){
        let {gridArray} =  this.game.gameContainer;
        for(let i = 0; i < this.currentTetromino.length; i++){
            for(let k = 0; k < this.currentTetromino[i].length; k++){
                if(this.currentTetromino[i][k] !== "0"){
                    gridArray[this.y + i][this.x + k] = this.currentTetromino[i][k];
                }
            }
        } 
    }
    rotateTetroino(){
        const numRows = this.currentTetromino.length; 
        const numCols = this.currentTetromino[0].length;
        //for square matrix
        if(numRows === numCols){
            // Transpose the array
            for (let i = 0; i < numRows; i++) {
                for (let j = i + 1; j < numCols; j++) {
                    [this.currentTetromino[i][j], this.currentTetromino[j][i]] = [this.currentTetromino[j][i], this.currentTetromino[i][j]];
                }
            }

            // Reverse each row
            for (let i = 0; i < numRows; i++) {
                this.currentTetromino[i].reverse();
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