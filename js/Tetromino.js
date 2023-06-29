class Tetromino{
    static tetrominos = [
        [
            ["0","0","0","0"],
            ["1","1","1","1"],
            ["0","0","0","0"],
            ["0","0","0","0"],
        ],
        [
            ["2","0","0"],
            ["2","2","2"],
            ["0","0","0"]
        ],
        [
            ["0","0","3"],
            ["3","3","3"],
            ["0","0","0"]
        ],
        [
            ["0","4","4","0"],
            ["0","4","4","0"],
            ["0","0","0","0"]
        ],
        [
            ["0","5","5"],
            ["5","5","0"],
            ["0","0","0"]
        ],
        [
            ["0","6","0"],
            ["6","6","6"],
            ["0","0","0"]
        ],
        [
            ["7","7","0"],
            ["0","7","7"],
            ["0","0","0"]
        ]
        
    ];
    static tetrominosColour = [
        "#0066FF",
        "#FFFF00",
        "#00D1FF",
        "#FF0000",
        "#05FF00",
        "#FFB800",
        "#AD00FF"
    ];
    constructor(game){
        this.game = game;
        this.currentTetromino = Tetromino.tetrominos[6];
        this.x = 3;
        this.y = 0;
        this.futurex = 0;
        this.futurey = 0;
        
        this.updateTetromino();
        this.timeoutid = 0;
        this.movementDownId = setInterval(this.moveDown.bind(this), 1000);
        this.horizontalMovementId = 0;
        this.isKeyPressed = false;
        this.isKeyPressedhorizontal = false;
        this.refmovement = this.movement.bind(this);
        this.refmovementUp = this.movementUp.bind(this);
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

        // spins the tetroino
        if((e.key === "Up" || e.key === "ArrowUp") && !this.isKeyPressed){
            this.rotateTetroino();
            this.isKeyPressed = true;
        }

        // moves the tetroino down faster
        if((e.key === "Down" || e.key === "ArrowDown") && !this.isKeyPressed){clearInterval(this.movementDownId);
            this.moveDown();
            this.movementDownId = setInterval(this.moveDown.bind(this), downInterval);
            this.isKeyPressed = true;
        }
    
        // moves the tetroino to the left
        if((e.key === "Left" || e.key === "ArrowLeft") && !this.isKeyPressedhorizontal){
            this.moveLeft();
            this.timeoutid = setTimeout(() => {
                this.horizontalMovementId = setInterval(this.moveLeft.bind(this), horizontalInterval);
            },timerOutinterval);
            this.isKeyPressedhorizontal = true;
        }
        // moves the tetroino to the right
        else if((e.key === "Right" || e.key === "ArrowRight") && !this.isKeyPressedhorizontal){
            this.moveRight();
            this.timeoutid = setTimeout(() => {
                this.horizontalMovementId = setInterval(this.moveRight.bind(this),  horizontalInterval);
            },timerOutinterval);
            this.isKeyPressedhorizontal = true;
        }
    }
    movementUp(e){
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
        this.updateTetromino();
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
        this.updateTetromino();
    }
    moveLeft(){
        this.x--;
        this.updateTetromino();
    }
    updateTetromino(){
        this.game.gameContainer.clearGridArray();
        for(let i = 0; i < this.currentTetromino.length; i++){
            for(let k = 0; k < this.currentTetromino[i].length; k++){
                if(this.currentTetromino[i][k] !== "0"){
                    this.game.gameContainer.gridArray[this.y + i][this.x + k] = this.currentTetromino[i][k];
                }
            }
        } 
    }
    rotateTetroino(){
        const numRows = this.currentTetromino.length; 
        const numCols = this.currentTetromino[0].length;
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
        this.updateTetromino();
    }

    update(){      

    }

    draw(){

    }
}