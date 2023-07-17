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
        "red", //Z
        "gray" //ghost piace
    ];
    static drawTetromino(tetromino, x, y, boxWidth){
        if(tetromino.length !== 0){
            let squareSize = 20;
            let howLong = 0;
            const rows = tetromino.length;
            const columns = tetromino[0].length;

            for(let i = 0; i < columns ; i++){
                let counter = 0;
                for(let k = 0; k < rows; k++){
                    if(tetromino[k][i]  !== "0"){
                        howLong++;
                        break;
                    }
                }
            }

            for(let i = 0; i < rows; i++){
                for(let k = 0; k < columns; k++){
                    if(tetromino[i][k] !== "0"){
                        if(tetromino[i][k] === "4"){
                            ctx.fillStyle = Tetromino.tetrominosColour[3];
                            let tetrominoY = (i * squareSize) + y;
                            let tetrominoX = ((k * squareSize) + x) + (boxWidth / 2) - (((howLong+2) * squareSize) / 2);
                            ctx.fillRect(tetrominoX, tetrominoY,squareSize,squareSize);
                            // Draws the black border
                            ctx.strokeStyle = "black";
                            ctx.strokeRect(tetrominoX, tetrominoY,squareSize,squareSize);
                        }
                        else{
                            switch(tetromino[i][k]){
                                case "1":
                                    ctx.fillStyle = Tetromino.tetrominosColour[0];
                                    break;
                                case "2":
                                    ctx.fillStyle = Tetromino.tetrominosColour[1];
                                    break;
                                case "3":
                                    ctx.fillStyle = Tetromino.tetrominosColour[2];
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
                                    break;
                            }
                            let tetrominoY = (i * squareSize) + y;
                            let tetrominoX = ((k * squareSize) + x) + (boxWidth / 2) - ((howLong * squareSize) / 2);
                            ctx.fillRect(tetrominoX, tetrominoY,squareSize,squareSize);
                            // Draws the black border
                            ctx.strokeStyle = "black";
                            ctx.strokeRect(tetrominoX, tetrominoY,squareSize,squareSize);
                        }

                    }
                }
            }
        }
        
    }
    static whatShape(tetromino){
        let arraysHaveSameMatrix = (array1, array2)=> {
            return JSON.stringify(array1) === JSON.stringify(array2);
        }
        if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[0])){
            return "i";
        }
        else if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[1])){
            return "j";
        }
        else if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[2])){
            return "l";
        }
        else if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[3])){
            return "o";
        }
        else if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[4])){
            return "s";
        }
        else if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[5])){
            return "t";
        }
        else if(arraysHaveSameMatrix(tetromino,Tetromino.tetrominos[6])){
            return "z";
        }
    }
    static whatTetromino(shape){
        if(shape === "i"){
            return Tetromino.tetrominos[0];
        }
        else if(shape === "j"){
            return Tetromino.tetrominos[1];
        }
        else if(shape === "l"){
            return Tetromino.tetrominos[2];
        }
        else if(shape === "o"){
            return Tetromino.tetrominos[3];
        }
        else if(shape === "s"){
            return Tetromino.tetrominos[4];
        }
        else if(shape === "t"){
            return Tetromino.tetrominos[5];
        }
        else if(shape === "z"){
            return Tetromino.tetrominos[6];
        }
    }
        
    constructor(gameContainer,tetromino,interval){
        this.gameContainer = gameContainer;

        this.currentTetromino = tetromino;
        this.currentShape = Tetromino.whatShape(tetromino);
        this.x = 3;
        this.y = 0;
        this.displaceY();
        this.rotation = 0;

        this.holdDelayinterval = 100;
        this.horizontalInterval = 100; // The rate at which the tetromino moves left or right
        this.defaultdownInterval = interval; // The default rate at which the tetromino move down
        this.downInterval = 30; // the rate at which the tetromino will move down when the down button is held

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

    displaceY(){
        let displacement = 0;
        let displace = true;
        do{
            let counter = 0;
            let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,0,displacement);
            for(let i = 0; i < futureTetrominoPos.length; i++){
                let {futuretX ,futuretY} = futureTetrominoPos[i];
                
                if(this.whichArray(futuretX,futuretY) === "0"){
                    counter++;
                }
                else{
                    break;
                }
            }
            if(counter === futureTetrominoPos.length){
                displace = false;
            }
            else{
                displacement--;
            }
            
        }while(displace);
        this.y += displacement;
    }
    whichArray(futuretX,futuretY){
        let {blocksArray,bufferArray} = this.gameContainer;
        if(futuretY >= 0){
            return blocksArray[futuretY][futuretX]; 
        }
        else{
            return bufferArray[bufferArray.length + futuretY][futuretX];
        }
    }
    movement(e){
            if (e.defaultPrevented) {
               // this.isKeyPressed = true;
                return; // Do nothing if the event was already processed
            }

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
        // makes the tetroino hard drop
        if(e.key === " " && !this.gameContainer.hardDropPrassed){
            this.hardDrop();
            this.gameContainer.hardDropPrassed = true;
        }

        if(e.key === "c"){
            this.gameContainer.game.leftContainer.holdTetromino();
            this.isKeyPressed = true;
        }
    }
    movementButtonUp(e){

        if((e.key === "Up" || e.key === "ArrowUp") && this.isKeyPressed){
            this.isKeyPressed = false;
        }
        if(e.key === " " || this.gameContainer.hardDropPrassed){
            this.gameContainer.hardDropPrassed = false;
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
    hardDrop(){
        let moveDown = true;
        while(moveDown){
            let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,0,1);
            for(let i = 0; i < futureTetrominoPos.length; i++){
                let {futuretX,futuretY} = futureTetrominoPos[i]; 
                if(futuretY >= this.gameContainer.rowLength || this.whichArray(futuretX,futuretY) !== "0"){
                    moveDown = false;
                    break;
                }
            }
            if(moveDown){
                this.y++;
            }
        }
        clearTimeout(this.lockTimeid);
        this.gameContainer.setTetromino();
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
        let {gridArray,bufferArray} = this.gameContainer;
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,0,0);
        let futureGhostTetromino = [];
        let gHostY = 0;
        let moveDown = true;
        while(moveDown){
            futureGhostTetromino = this.futureTetrominoPos(this.currentTetromino,0,gHostY);
            for(let i = 0; i < futureGhostTetromino.length; i++){
                let {futuretX,futuretY} = futureGhostTetromino[i]; 
                if(futuretY >= this.gameContainer.rowLength || this.whichArray(futuretX,futuretY) !== "0"){
                    moveDown = false;
                    break;
                }
            }
            if(moveDown){
                gHostY++;
            }
        }
        for(let i = 0; i < futureGhostTetromino.length; i++){
            let {futuretX ,futuretY} = futureGhostTetromino[i];
            if(futuretY - 1 >= 0){
                gridArray[futuretY - 1][futuretX] = "8"; 
            }
            else{
                bufferArray[bufferArray.length - 1 + futuretY][futuretX] = "8";
            }
        }
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX ,futuretY} = futureTetrominoPos[i];
            if(futuretY >= 0){
                gridArray[futuretY][futuretX] = this.currentTetromino[futuretY - this.y][futuretX - this.x]; 
            }
            else{
                bufferArray[bufferArray.length + futuretY][futuretX] = this.currentTetromino[futuretY - this.y][futuretX - this.x];
            }
        }         
    }

    canMoveLeft(){
        let {blocksArray,bufferArray} =  this.gameContainer;
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,-1,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretX < 0 || this.whichArray(futuretX,futuretY) !== "0"){
                return false; 
            }
        }
        return true;
    }
    canMoveRight(){
        let {blocksArray,bufferArray} =  this.gameContainer;
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,1,0);
        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretX >= this.gameContainer.columnsLength || this.whichArray(futuretX,futuretY) !== "0"){
                return false; 
            }
        }
        return true;
    }
    canMoveDown(){
        let {blocksArray,bufferArray} =  this.gameContainer;
        let futureTetrominoPos = this.futureTetrominoPos(this.currentTetromino,0,1);

        for(let i = 0; i < futureTetrominoPos.length; i++){
            let {futuretX,futuretY} = futureTetrominoPos[i]; 
            if(futuretY >= this.gameContainer.rowLength || this.whichArray(futuretX,futuretY) !== "0"){
                // Start the lock timer
                clearInterval(this.movementDownId);
                if(!this.lockTimeidSet){
                    this.lockTimeid = setTimeout(this.gameContainer.setTetromino.bind(this.gameContainer),500);
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

    superRotationSystem(tetromino){
        let {blocksArray,bufferArray,columnsLength,rowLength} =  this.gameContainer;
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
                let {futuretX,futuretY} = tests[k];
                if(futuretX < columnsLength && futuretX >= 0 && futuretY < rowLength){
                    if(this.whichArray(futuretX,futuretY) === "0"){
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
        if( this.currentShape !== "o"){
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