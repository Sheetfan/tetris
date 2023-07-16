class RightContainer{
    constructor(game){
        this.game = game;
        this.x = 280 + game.x;
        this.y = 0 + game.y;
        this.height = 560;
        this.width = 150;
        
        this.bag = [
            Tetromino.tetrominos[0],Tetromino.tetrominos[1],Tetromino.tetrominos[2],Tetromino.tetrominos[3],
            Tetromino.tetrominos[4],Tetromino.tetrominos[5],Tetromino.tetrominos[6]
        ];
        this.bag2 = [
            Tetromino.tetrominos[0],Tetromino.tetrominos[1],Tetromino.tetrominos[2],Tetromino.tetrominos[3],
            Tetromino.tetrominos[4],Tetromino.tetrominos[5],Tetromino.tetrominos[6]
        ];
        this.bag = Game.shuffleArray(this.bag);
        this.bag2 = Game.shuffleArray(this.bag2);
    }
    getNexttetromino(){
        let fillBag2 = ()=>{
            for(let i = 0; i < Tetromino.tetrominos.length; i++){
                this.bag2.push(Tetromino.tetrominos[i]);
                
            }
            this.bag2 = Game.shuffleArray(this.bag2);
        };
        if(this.bag2.length === 0){
            fillBag2();
        }
        this.bag.push(this.bag2.shift());
        return this.bag.shift();
    }
    update(){

    }
    drawTetromino(tetromino, x, y, boxWidth, boxHeight){
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
    drawInNextBox(boxWidth, boxHeight,boxX,boxY){
        ctx.font = this.game.font;
        ctx.fillStyle = "white";
        ctx.fillText("Next", boxX + boxWidth/2 -15, boxY + 16+10);
        this.drawTetromino(this.bag[0],boxX,boxY + 45, boxWidth, boxHeight);
    }
    drawNextBox(){
        let boxWidth = 100;
        let boxHeight = 120;
        let boxX = this.x + (this.width/2) - (boxWidth/2);
        let boxY = this.y+10;
        ctx.strokeStyle = "white";
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        this.drawInNextBox(boxWidth, boxHeight, boxX, boxY);
    }
    drawNextBoxs(){
        let boxX = this.x;
        let boxY = this.y + 90;
        for(let i = 1; i < this.bag.length -1; i++){
            let gap = i * 75;
            this.drawTetromino(this.bag[i],boxX,boxY + gap,this.width,this.height);
        }
    }
    draw(){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.drawNextBox();
        this.drawNextBoxs();
    }
}