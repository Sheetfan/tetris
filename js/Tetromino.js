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
    ]
    constructor(game){
        this.game = game;
        this.currentTetromino = Tetromino.tetrominos[6];
        this.x = 3;
        this.y = 0;
        this.updateTetromino();
        this.id = setInterval(this.moveDown.bind(this), 1000);
        this.isKeyPressed = false;
        window.addEventListener("keydown",(e)=>{
            if(!this.isKeyPressed){
                if (e.defaultPrevented) {
                    this.isKeyPressed = true;
                    return; // Do nothing if the event was already processed
                }
                if((e.key === "Up" || e.key === "ArrowUp")){
                    this.rotateTetroino();
                    this.game.gameContainer.clearGridArray();
                    this.updateTetromino();
                    console.log(this.currentTetromino);
                }
                if(e.key === "Left" || e.key === "ArrowLeft"){
                    this.x--;
                    this.game.gameContainer.clearGridArray();
                    this.updateTetromino();
                }
                if(e.key === "Right" || e.key === "ArrowRight"){
                    this.x++;
                    this.game.gameContainer.clearGridArray();
                    this.updateTetromino();
                }
                this.isKeyPressed = true;
            }
            
        });
        window.addEventListener("keyup",(e)=>{
            if (this.isKeyPressed) {
                this.isKeyPressed = false;
            }
        });
    }
    moveDown(){
        this.y += 1;
        this.game.gameContainer.clearGridArray();
        this.updateTetromino();
    }
    updateTetromino(){
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

    };
    update(){

    }
    draw(){

    }
}