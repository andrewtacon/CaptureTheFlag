const game = new Game();

const gameWidth = 800;
const gameHeight = 400;
const prisonSize = 40;
const playerRadius = 20;
const flagRadius = 40;
const timeLimit = 120;
const speed = 3;



function setup() {
  createCanvas(gameWidth, gameHeight);
  game.start();
  game.setupGame();
}

function draw() {
  
    stroke('black');
    //draw the board
    fill('lightblue');
    rect(0,0,width/2,height);
    fill('lightpink');
    rect(width/2,0, width/2, height);
    
    //jail
    fill('white');
    rect(0,0,prisonSize,prisonSize);
    rect(width-prisonSize, height-prisonSize, prisonSize, prisonSize);
    
    //draw players
    for (let i=0; i<10; i++){
        let player = game.getPlayerData(i);
        if (player.team===0) {
            fill('blue');
        } else {
            fill('red');
        }
        circle(player.x, player.y, playerRadius);
    }
  
    //draw flags
    for (let i=0; i<2; i++){
        let flag = game.getFlagData(i);
        if (flag.team===0) {
            fill('blue');
        } else {
            fill('red');
        }
        circle(flag.x, flag.y, flagRadius);
    }
    
    //process the game playerRadius
    if (game.checkIsGameOver()===false){
        game.processMoves();
        game.checkForPlayerCaptures();
        game.checkForJailBreaks();
        game.checkForFlagPickup();
        game.checkForPoints();
        game.displayPoints();
        game.checkTimeVictory();
        game.checkFlagVictory();
    }
  
}