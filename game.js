
  

class Player {
    constructor(x,y,team){
        this.x=x;
        this.y=y;
        this.team=team;
        this.isInJail = false;
        this.distance = 0;
    }
}

function Game(){
   
   let playerData = [];
   let flagData = [];
   
   let player0AI = new ai0();
   let player1AI = new ai1();
  
   let player0Score = 0;
   let player1Score = 0;
   
   let isGameOver = false;
  
   
   this.setupGame = function(){
       
       for (var i=0; i<10; i++){
           let x = i % 2 * 400 + 200;
           let y = Math.floor(i/2) * 80 + 40;
           let t = i%2;
           playerData.push(new Player(x,y,t));
       }    
       
       flagData.push(new Player(50,200,1));
       flagData.push(new Player(750,200,0));
   };
   
   this.start = function () {
       console.log("Game started.");
   };
   
   this.getPlayerData = function(playerNumber) {
       return playerData[playerNumber];
   };

   this.getFlagData = function(flagNumber) {
       return flagData[flagNumber];
   };
   
   this.processMoves = function() {

       let moves = [];
       try {moves.push(player0AI.bot1());} catch (e){ console.log("Player 0 - Bot 1 - Does not exist."); }
       try {moves.push(player1AI.bot1());} catch (e){ console.log("Player 1 - Bot 1 - Does not exist."); }
       try {moves.push(player0AI.bot2());} catch (e){ console.log("Player 0 - Bot 2 - Does not exist."); }
       try {moves.push(player1AI.bot2());} catch (e){ console.log("Player 1 - Bot 2 - Does not exist."); }
       try {moves.push(player0AI.bot3());} catch (e){ console.log("Player 0 - Bot 3 - Does not exist."); }
       try {moves.push(player1AI.bot3());} catch (e){ console.log("Player 1 - Bot 3 - Does not exist."); }
       try {moves.push(player0AI.bot4());} catch (e){ console.log("Player 0 - Bot 4 - Does not exist."); }
       try {moves.push(player1AI.bot4());} catch (e){ console.log("Player 1 - Bot 4 - Does not exist."); }
       try {moves.push(player0AI.bot5());} catch (e){ console.log("Player 0 - Bot 5 - Does not exist."); }
       try {moves.push(player1AI.bot5());} catch (e){ console.log("Player 1 - Bot 5 - Does not exist."); }

        for (var i=0; i<moves.length; i++){
            if (playerData[i].isInJail===true){continue;}
            
            let vector = createVector(moves[i][0], moves[i][1]);
            vector.normalize().mult(speed);
            
            playerData[i].x += vector.x;
            playerData[i].y += vector.y;
            
            if (playerData[i].x<0) {playerData[i].x=0;}
            if (playerData[i].y<0) {playerData[i].y=0;}
            if (playerData[i].x>width) {playerData[i].x=width;}
            if (playerData[i].y>height) {playerData[i].y=height;}
        }    
   
   };
   
   
   this.checkForPlayerCaptures = function(){
       for (var i=0; i<10; i++){
            //if in opponents side then skip this
            if (i%2===0){ 
                if (playerData[i].x<=width/2){
                    continue;
                }
            } else {
                if (playerData[i].x>width/2){
                    continue;
                }
            }
            
            //go through all players, skipping self and own team members and checking distance
            //if distance < 40 then other player goes to isInJail = true
            for (var j=0; j<10; j++){
                if (i===j){continue;}
                if (playerData[j].isInJail === true){continue;}
                if (playerData[i].team === playerData[j].team){continue;}
                if (dist(playerData[j].x,playerData[j].y, playerData[i].x, playerData[i].y)<20){
                    playerData[i].isInJail=true;
                    if(playerData[i].team===0){
                        playerData[i].x=20;
                        playerData[i].y=20;
                    } else {
                        playerData[i].x=780;
                        playerData[i].y=380;
                    }
                }
            }
            
           
       }
   };
   
   
   this.checkForJailBreaks = function() {
  //     TODO
        for (let i=0; i<10; i++){
            if (!playerData[i].isInJail) {continue;}    //if not in jail then move on
            let team = playerData[i].team;
            
            //check for collision with team members only who are not in jail
            for (let j = 0; j<10; j++){
                if (i===j) {continue;}  //cannot check against self
                if (playerData[j].isInJail) {continue;}     //cannot check against bots in jail
                if (playerData[j].team !== team) {continue;} //cannot check against non-team members
                
                let distance = dist(playerData[i].x, playerData[i].y, playerData[j].x, playerData[j].y);
                if (distance < playerRadius) {
                    playerData[i].isInJail = false;
                    break;
                }
                
                
            }
            
        }
  
  
   };
    
    this.getTeamFlag = function(teamNumber){
        for (var i=0; i<flagData.length; i++){
            if (flagData[i].team === teamNumber){
                return flagData[i];
            }
        }    
    };
    
    
    
    this.checkForFlagPickup = function() {
        
        let closest = [];
        //this code goes through all the players and finds players taht are close to the flag to pick it up.
        //the algorithm selects only the closest player to base the movement off of
        for (var i=0; i<10;i++){
            if (playerData[i].isInJail){continue;}
            let flag = this.getTeamFlag(playerData[i].team);
            let distance = dist(playerData[i].x, playerData[i].y, flag.x, flag.y);
            if (distance<=(flagRadius+playerRadius)/2 + speed*2){
                playerData[i].distance = distance;
                if (closest[playerData[i].team] !== undefined) {
                    if (playerData[i].distance < closest[playerData[i].team].distance){
                        closest[playerData[i].team] = playerData[i];
                    }
                } else {
                    closest[playerData[i].team] = playerData[i];
                }
            }
        }
        
        
        //this moves the flag (if necessary)
        for (var j=0; j<2; j++){
            if (closest[j] === undefined){continue;}
            
            let flag = this.getTeamFlag(closest[j].team);
            let dx = closest[j].x - flag.x;
            let dy = closest[j].y - flag.y;
            let vector = createVector(dx,dy);
            vector.normalize().mult(speed);
            
            let newFlagX = flag.x + vector.x;
            let newFlagY = flag.y + vector.y
            
            let separation = dist(newFlagX, newFlagY, closest[j].x, closest[j].y);
            if (separation < (flagRadius+playerRadius/2) && separation > (flagRadius+playerRadius)/2 - speed ){
                flag.x = newFlagX;
                flag.y = newFlagY;
            }
            
        }
        
        
    }
    
    this.checkForPoints = function() {
        for (var i=0; i<10; i++){
            //if in opponents side then skip this
            if (i%2===0){ 
                if (playerData[i].x>width/2){
                    player0Score++;
                    continue;
                }
            } else {
                if (playerData[i].x<=width/2){
                    player1Score++;
                    continue;
                }
            }
        }
    };
    
    this.displayPoints = function() {
        fill('black');
        noStroke();
        textSize(14);
        
        let spacer=0;
        if (player0Score>=10) {spacer=1;}
        if (player0Score>=100) {spacer=2;}
        if (player0Score>=1000) {spacer=3;}
        if (player0Score>=10000) {spacer=4;}
        if (player0Score>=100000) {spacer=5;}
        if (player0Score>=1000000) {spacer=6;}
        
        text(player0Score, width/2-60-spacer*8, height-30);
        text(player1Score, width/2+50, height - 30);
    };
    
    this.checkTimeVictory= function(){
        if (frameCount >= timeLimit * 60){
            
            if (player0Score > player1Score){
                this.endGame("Player 0 Wins!");
            } 
            if (player0Score < player1Score){
                this.endGame("Player 1 Wins!");
            } 
            if (player0Score === player1Score){
                this.endGame("A draw!");
            } 
            
        }
        
        let timeLeft = "Time Left   "+ (120 - (frameCount/60));
        text(timeLeft.substr(0,18), width/2-66, 20);
        
    }
    
    
    this.checkFlagVictory = function(){
        if (flagData[0].x<=width/2 && flagData[0]>width/2){
            this.endGame("A draw!");
        }
        if (flagData[0].x>=width/2){
            this.endGame("Player 0 Wins The Flag!");
        }
        if (flagData[1].x<width/2){
            this.endGame("Player 0 Wins The Flag!");
        }
        
    }
    
    this.endGame = function(message) {
        console.log(message);
        isGameOver = true;
    }
    
    this.checkIsGameOver = function(){
        return isGameOver;
    }
    
}

