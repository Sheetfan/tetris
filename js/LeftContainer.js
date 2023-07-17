class LeftContainer{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.height = 560/2;
        this.width = 150;
        this.heldTetromino = [];
        this.level = 1;
        this.maxlevel = 12;
        this.score = 0;
        this.holdPassed = false;
    }
    getSpeed(){
        if(this.maxlevel <= this.level){
            this.level = this.maxlevel;
        }
        switch(this.level){
            case 1:
                return 1000;
            case 2:
                return 793;
            case 3:
                return 618;
            case 4:
                return 473;
            case 5:
                return 355;
            case 6:
                return 262;
            case 7:
                return 190;
            case 8:
                return 135;
            case 9:
                return 94;
            case 10:
                return 64;
            case 11:
                return 43;
            case 12:
                return 28;

        }
    }
    increaseScore(lines){
        let score = 0;
        switch(lines){
            case 1:
                score = 100;
                break;
            case 2: 
                score = 300;
                break;
            case 3:
                score = 500;
                break;
            case 4:
                score = 800;
                break;
        }
        this.score += score * this.level;

    }
    holdTetromino(){
        let {gameContainer, rightContainer} = this.game;
        let {currentShape} = gameContainer.tetromino;
        if(this.holdPassed === false){
            if(this.heldTetromino.length === 0){
                this.heldTetromino = Tetromino.whatTetromino(currentShape);
                this.holdPassed = true;
                gameContainer.respawnTetromino(rightContainer.getNexttetromino());
            }
            else{
                let tempTetromino =Tetromino.whatTetromino(currentShape);
                [this.heldTetromino,tempTetromino] = [tempTetromino,this.heldTetromino];
                this.holdPassed = true;
                gameContainer.respawnTetromino(tempTetromino);
            }
        }

    }
    update(){

    }
    drawHoldBox(){
        let boxWidth = 100;
        let boxHeight = 120;
        let boxX = this.x + (this.width/2) - (boxWidth/2);
        let boxY = this.y+10;
        ctx.strokeStyle = "white";
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        this.drawInHoldBox(boxWidth, boxHeight, boxX, boxY);
    }

    drawInHoldBox(boxWidth, boxHeight,boxX,boxY){
        ctx.font = this.game.font;
        ctx.fillStyle = "white";
        ctx.fillText("Hold", boxX + boxWidth/2 -15, boxY + 16+10);
        //this.drawTetromino(this.bag[0],boxX,boxY + 45, boxWidth, boxHeight);
        Tetromino.drawTetromino(this.heldTetromino,boxX,boxY + 45, boxWidth);
    }
    draw(){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        this.drawHoldBox();

        ctx.font = this.game.font;
        ctx.fillStyle = "white";

        ctx.fillText(`Score: ${Game.pad(this.score,8)}`, this.x + this.width / 2 -60, this.y + 16 + 170);
        ctx.fillText(`Level: ${this.level}`, this.x + this.width / 2 -25, this.y + 16 + 230);
    }
}