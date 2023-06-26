class GameContainer{
    constructor(game){
        this.game = game;
        this.blockSize = 28;
        this.rowLength = 20;
        this.columnsLength = 10;
        this.height = this.blockSize * this.rowLength;
        this.width = this.blockSize * this.columnsLength;
        this.x = (this.game.gameWidth - this.width) / 2;
        this.y = (this.game.gameHeight - this.height) / 2;

    }
    update(){

    }
    draw(){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        for(let i = 0; i < this.rowLength; i++){
            ctx.moveTo(this.x, this.y + (i* this.blockSize));
            ctx.lineTo(this.x + this.width , this.y + (i*this.blockSize));
            ctx.stroke();
        }
        for(let k = 0; k < this.columnsLength; k++){
            ctx.moveTo(this.x + (k * this.blockSize),this.y);
            ctx.lineTo(this.x + (k * this.blockSize), this.y + this.height);
            ctx.stroke();
        }
        
    }
}