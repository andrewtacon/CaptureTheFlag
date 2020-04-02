/*
Template bot entries

    bot1() {
        return [dx,dy];    
    }

dx = number of pixels to move left or right 
dy = number of pixels to move up or down 

NOTES: 
1. The game will normalise these values so the bot moves exactly 1 pixel per turn (or whatever the final speed happens to be)
2. The program will look for bots named  bot1, bot2, bot3, bot4 and bot5 ONLY.
3. Any functions you write cannot have 'function' written at the front. This is because all 
your code will be encapsulated into a class
4. You may create arrays, variable etc to store things. These should be persistant, that is, exist 
between movements of your robots
5. From the game itself you can only access bot information using the game.getPlayerData(playerNumber) function.
This returns an object that looks like this:

    class Player {
        constructor(x,y,team){
            this.x=x;                   //bot x position  
            this.y=y;                   //bot y position
            this.team=team;             //bot team
            this.isInJail = false;      //if the bot is captured and in jail
            this.distance = 0;          //a value that records distance to the flag. This is used for in game stuff like seeing 
                                        //if the player is close to the flag. I wouldn't trust it's accuracy as it is only updated
                                        //when the bot is close enough to the flag to pick it up.
        }
    }
    
6. You can get the location of the flags using game.getTeamFlag(teamNumber). teamNumber is 0 or 1.
7. You can obtain your own team number by accessing the variable this.team in your code - it is created when you code is encapulated 
into a class.
8. All moves by all players are calculated from the game state and applied at the same time. Then collisions/pickups etc are calculated.


*/


bot1(){
    let dx=0;
    let dy=0;
    if (keyIsDown(LEFT_ARROW)){
        dx =-1;
    }
    if (keyIsDown(RIGHT_ARROW)){
        dx =1;
    }
    if (keyIsDown(UP_ARROW)){
        dy =-1;
    }
    if (keyIsDown(DOWN_ARROW)){
        dy =1;
    }

    return [dx, dy];
}

bot2(){
    return [1,0];
}

bot3(){
    return [1,0];
}

bot4(){
    return [1,0];
}

bot5(){
    return [1,0];
}
