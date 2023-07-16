class RightContainer{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
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

    drawInNextBox(boxWidth, boxHeight,boxX,boxY){
        ctx.font = this.game.font;
        ctx.fillStyle = "white";
        ctx.fillText("Next", boxX + boxWidth/2 -15, boxY + 16+10);
        Tetromino.drawTetromino(this.bag[0],boxX,boxY + 45, boxWidth);
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
            Tetromino.drawTetromino(this.bag[i],boxX,boxY + gap,this.width);
        }
    }
    draw(){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        this.drawNextBox();
        this.drawNextBoxs();
    }
}