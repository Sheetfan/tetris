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
        let index = 1;
        // let index = Math.floor(Math.random() * 7);
        let random = Tetromino.tetrominos[index];

        this.currentTetromino = random.map((subArray) => subArray.slice());
        this.currentShape = this.whatShape(index);
        this.x = 3;
        this.y = 0;   
        this.rotation = 0;

        this.holdDelayinterval = 100;
        this.horizontalInterval = 100; // The rate at which the tetromino moves left or right
        this.defaultdownInterval = 1000; // The default rate at which the tetromino move down
        this.downInterval = 50; // the rate at which the tetromino will move down when the down button is held

        this.movementDownId = setInterval(this.moveDown.bind(this), this.defaultdownInterval);
        this.timeoutid = 0;
        this.lockTimeid = 0;
        this.horizontalMovementId = 0;

        this.lockTimeidSet = false;
        this.canDownBool = true;
        this.isKeyPressed = false;
        this.isKeyPressedhorizontal = false;
        this.refmovement = this.movement.bind(this);
        this.refmovementUp = this.movementButtonUp.bind(this);
        window.addEventListener("keydown",this.refmovement);
        window.addEventListener("keyup", this.refmovementUp);
    }
    whatShape(index){
        switch(index){
            case 0:
                return 'i';
            case 1:
                return 'j';
            case 2:
                return 'l';
            case 3:
                return 'o';
            case 4:
                return's';
            case 5:
                return 't';
            case 6:
                return 'z';
        }
    }
    movement(e){
            // if (e.defaultPrevented) {
            //     this.isKeyPressed = true;
            //     return; // Do nothing if the event was already processed
            // }

        // Spins the tetroino clockwise
        if((e.key === "Up" || e.key === "ArrowUp") && !this.isKeyPressed){
            this.rotateTetroino();
            this.isKeyPressed = true;
        }

        // Moves the tetroino down faster
        if((e.key === "Down" || e.key === "ArrowDown") && !this.isKeyPressed){
            clearInterval(this.movementDownId);
            this.moveDown();
            this.movementDownId = setInterval(this.moveDown.bind(this), this.downInterval);
            this.isKeyPressed = true;
        }
    
        // Moves the tetroino to the left
        if((e.key === "Left" || e.key === "ArrowLeft") && !this.isKeyPressedhorizontal){
            this.moveLeft();
            // start the delay
            this.timeoutid = setTimeout(() => {
                this.horizontalMovementId = setInterval(this.moveLeft.bind(this), this.horizontalInterval);
            },this.holdDelayinterval);
            this.isKeyPressedhorizontal = true;
        }
        // Moves the tetroino to the right
        else if((e.key === "Right" || e.key === "ArrowRight") && !this.isKeyPressedhorizontal){
            this.moveRight();
            // start the delay
            this.timeoutid = setTimeout(() => {
                this.horizontalMovementId = setInterval(this.moveRight.bind(this),  this.horizontalInterval);
            },this.holdDelayinterval);
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
            this.movementDownId = setInterval(this.moveDown.bind(this),this.defaultdownInterval);
        }
        if((e.key === "Left" || e.key === "ArrowLeft" || e.key === "Right" || e.key === "ArrowRight")
                && this.isKeyPressedhorizontal){
            this.isKeyPressedhorizontal = false;
            clearTimeout(this.timeoutid);
            clearInterval(this.horizontalMovementId);
        }
    }
    moveDown(){
        if(this.canDownBool){
            this.y++;
        }
    }
    stopMoving(){
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
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,0,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX ,futuretY} = futureTetrominoPos[i];
            gridArray[futuretY][futuretX] = this.currentTetromino[futuretY - this.y][futuretX - this.x];
        } 
    }
    setTetromino(){
        this.stopMoving();
        this.gameContainer.addToBlocksArray();
        this.gameContainer.clearLines();
        this.makeNewTetromio(this.gameContainer);
    }
    canMoveLeft(){
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,-1,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretX < 0 || this.gameContainer.blocksArray[futuretY][futuretX] !== "0"){
                return false; 
            }
        }
        return true;
    }
    futureTetrominoPos(tetromino,diffX,diffy){
        let futureTetrominoPos = [];
        for(let i = 0; i < tetromino.length; i++){
            for(let k = 0; k < tetromino[i].length; k++){
                if(tetromino[i][k] !== "0"){
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
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,1,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretX >= this.gameContainer.columnsLength || this.gameContainer.blocksArray[futuretY][futuretX] !== "0"){
                return false; 
            }
        }
        return true;
    }
    canMoveDown(){
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,0,1);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretY >= this.gameContainer.rowLength || this.gameContainer.blocksArray[futuretY][futuretX] !== "0"){
                // Start the lock timer
                clearInterval(this.movementDownId);
                if(!this.lockTimeidSet){
                    this.lockTimeid = setTimeout(this.setTetromino.bind(this),500);
                    this.lockTimeidSet = true;
                }
                return false;
            }
        }
        //resets the timer for the tetro moving down
        if(this.lockTimeidSet){
            if(this.isKeyPressed){
                this.movementDownId = setInterval(this.moveDown.bind(this), this.downInterval);
            }
            else{
                this.movementDownId = setInterval(this.moveDown.bind(this), this.defaultdownInterval);
            }
        }
        clearTimeout(this.lockTimeid);
        this.lockTimeidSet =false;
        return true;
    }
    superRotationSystem(tetromino){
        let futureRotation = this.rotation + 1;
        let futurePos = {
            x:0,
            y:0
        }
        let kickData = []; //All kickData to test
        if(futureRotation > 3){
            futureRotation= 0;
        }
        let canRotateflag = false;
        if(this.currentShape !== "i"){
            switch (futureRotation){
                case 0:
                    kickData = [
                        {x:0,y:0},
                        {x:-1,y:0},
                        {x:-1,y:1},
                        {x:0,y:-2},
                        {x:-1,y:-2},
                    ]; 
                    break;
                case 1:
                    kickData = [
                        {x:0,y:0},
                        {x:-1,y:0},
                        {x:-1,y:-1},
                        {x:0,y:+2},
                        {x:-1,y:2},
                    ];
                    break;
                case 2:
                    kickData = [
                        {x:0,y:0},
                        {x:1,y:0},
                        {x:1,y:1},
                        {x:0,y:-2},
                        {x:1,y:-2},
                    ];
                    break;
                case 3:
                    kickData = [
                        {x:0,y:0},
                        {x:1,y:0},
                        {x:1,y:-1},
                        {x:0,y:2},
                        {x:1,y:2},
                    ];
                    break;
            }
        }
        else{
            switch (futureRotation){
                case 0:
                    kickData = [
                        {x:0,y:0},
                        {x:1,y:0},
                        {x:-2,y:0},
                        {x:1,y:2},
                        {x:-2,y:-1},
                    ];
                    break;
                case 1:
                    kickData = [
                        {x:0,y:0},
                        {x:-2,y:0},
                        {x:1,y:-0},
                        {x:-2,y:1},
                        {x:1,y:-2},
                    ];
                    break;
                case 2:
                    kickData = [
                        {x:0,y:0},
                        {x:-1,y:0},
                        {x:2,y:0},
                        {x:-1,y:-2},
                        {x:2,y:1},
                    ];
                    break;
                case 3:
                    kickData = [
                        {x:0,y:0},
                        {x:2,y:0},
                        {x:-1,y:0},
                        {x:2,y:-1},
                        {x:-1,y:2},
                    ];
                    break;
            }
        }
        for(let i = 0; i < kickData.length; i++){
            let tests = this.futureTetrominoPos(tetromino,kickData[i].x,kickData[i].y);
            let counter = 0;
            for(let k = 0; k < tests.length; k++){
                if(tests[k].futuretX < this.gameContainer.columnsLength && tests[k].futuretX >= 0 && tests[k].futuretY < this.gameContainer.rowLength){
                    if(this.gameContainer.blocksArray[tests[k].futuretY][tests[k].futuretX] === "0"){
                        counter++;
                    } 
                }
            }

            if(counter === tests.length){
                canRotateflag = true;
                futurePos = kickData[i];
                break;
            }
            
        }
        if(canRotateflag){
            this.x += futurePos.x;
            this.y += futurePos.y;
            this.rotation = futureRotation;
            return tetromino;
        }
        else{
            return this.currentTetromino;
        }
    }
    rotateTetroino(){
        const numRows = this.currentTetromino.length; 
        const numCols = this.currentTetromino[0].length;
        let array = this.currentTetromino.map((subArray) => subArray.slice());
        //for square matrix
        if(numRows === numCols){
            // Transpose the array
            for (let i = 0; i < numRows; i++) {
                for (let k = i + 1; k < numCols; k++) {
                    [array[i][k], array[k][i]] = [array[k][i],array[i][k]];
                }
            }

            // Reverse each row
            for (let i = 0; i < numRows; i++) {
                array[i].reverse();
            }
            this.currentTetromino = this.superRotationSystem(array);
        } 
        
    }

    update(){      
        this.updateTetromino();
        this.canDownBool = this.canMoveDown();
    }

    draw(){

    }
}