class Block{
    constructor(game) {
        this.game = game;
        this.x = 5;
        this.y = 0;
        
        // start the block on top of the screen
        game.gameContainer.gridArray[this.y][this.x] = "1";
        this.id = setInterval(()=>{
            this.y += 1;
            this.game.gameContainer.setupArray();
            this.game.gameContainer.gridArray[this.y][this.x] = "1";
        }, 1000);
    }

    update(){
        
    }
    draw(){

    }
}