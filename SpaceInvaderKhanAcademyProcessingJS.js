var Something = function(posX, posY, width, height){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
};

var CharacterObj = function(posX, posY, width, height, image, energy){
    Something.call(this, posX, posY, width, height);
    this.image = image;
    this.energy = energy;
};

var Aircraft = function(posX, posY, width, height, image, energy, currentPower){
    CharacterObj.call(this, posX, posY, width, height, image, energy);
    this.currentPower = currentPower;
};

var Invader = function(posX, posY, width, height, image, energy, speed, hasGift){
    CharacterObj.call(this, posX, posY, width, height, image, energy);
    this.speed = speed;
    this.hasGift = hasGift;
};

var Shoot = function(posX, posY, width, height, type){
    Something.call(this, posX, posY, width, height);
    this.type = type;
};

var Gift = function(posX, posY, width, height, image){
    Something.call(this, posX, posY, width, height);
    this.image = image;    
};

var Star = function(x1, y1, x2, y2, x3, y3){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
};

var Display = function(posX, posY, text, textSize, color, points){
    this.posX = posX;
    this.posY = posY;   
    this.text = text;
    this.textSize = textSize;
    this.color = color;
    this.points = points;
};

//------------End Constructors

//----Variables
var invaders = [];
var shoot = [];
var gift = [];
var star = [];
var startPosX = 99;

var aircraft = new Aircraft(180, 320, 50, 60, getImage("space/rocketship"), 1000, 1);
var score = new Display(20, 20, "Score: ", 15, color(255,255,255), 0);
var enemies = new Display(300, 20, "Enemies: ", 15, color(255,255,255), "");
var energy = new Display(120, 20, "Energy: ", 15, color(255, 255, 255), aircraft.energy);
var youLose = new Display(100, 250, "You Lose!", 50, color(255, 0, 0), "");
var youWin = new Display(100, 250, "You Win!", 50, color(0, 0, 255), "");
var bigInvader = new Invader(0, 0, 400, 400, getImage("avatars/robot_male_3"), 0, 0, false);
var bigSavior = new Invader(0, 0, 400, 400, getImage("creatures/Hopper-Jumping"), 0, 0, false);


//----------------Variables

//----Functions
Aircraft.prototype.draw = function(mX, mY) {
    this.posX = mX - 20;
    this.posY = constrain(mY - 40, 0, height-50);
    image(this.image, this.posX, this.posY, this.width, this.height);
};

Aircraft.prototype.getGift = function(gift) {
    if ((gift.posX >= (this.posX+20) && gift.posX <= (this.posX  + 50)) &&
        (gift.posY >= this.posY && gift.posY <= (this.posY + 42))) {
        gift.posX = 0;
        gift.posY = 400;
    }
};

Invader.prototype.draw = function() {
    if(this.energy!==0){
        if (random(-1000, 1000) >= 0){
            this.posY = constrain(this.posY+2, 20, height);
        }else{
            this.posY = constrain(this.posY-2, 20, height-60);
        }
    }
    this.posY = constrain(this.posY, 0, height-60);
    this.posX-=this.speed;
    //rect(this.posX, this.posY, this.width, this.height);
    image(this.image, this.posX, this.posY, this.width, this.height);
};

Shoot.prototype.draw = function() {
    if(this.type===1){
        fill(50, 155, random(0,255));
        noStroke();
        this.posX+=4;
        ellipse(this.posX+55,this.posY+40, 20, 5);   
    }
};

Shoot.prototype.collision = function(invader, shootIndex) {
    if ((invader.posX >= (this.posX+20) && invader.posX <= (this.posX  + 50)) &&
        (invader.posY >= this.posY && invader.posY <= (this.posY + 42))) {
        shoot[shootIndex].posX = 400;
        invader.energy--;
    }
};

Gift.prototype.draw = function() {
    this.posX--;
    this.posY++;
    image(this.image, this.posX, this.posY, 20, 30);
};

Display.prototype.draw = function() {
    textFont(createFont("fantasy"));
    fill(this.color);
    textSize(this.textSize);
    text(this.text + " " + this.points, this.posX, this.posY);
};

Star.prototype.draw = function() {
    fill(255, 255, 255);
    noStroke();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
};

//------------End Functions

//----Loading Enemies
for(var i = 0; i <=99; i++){
    var ran = random(0,4);
    var hasGift = false;
    
    if(ran>3){hasGift = true;}
    
    if(ran<=1){
        invaders.push(new Invader(i * startPosX + 400, random(20, 350), 40, 40, getImage("avatars/old-spice-man"), 5, random(0.5, 1), hasGift));
    }else if(ran<=2){
        invaders.push(new Invader(i * startPosX + 400, random(20, 350), 40, 40, getImage("avatars/orange-juice-squid"), 5, random(0.5, 1), hasGift));
    }else if(ran<=3){
        invaders.push(new Invader(i * startPosX + 400, random(20, 350), 40, 40, getImage("avatars/purple-pi"), 5, random(0.5, 1), hasGift));
    }else if(ran<=4){
        invaders.push(new Invader(i * startPosX + 400, random(20, 350), 40, 40, getImage("avatars/spunky-sam"), 5, random(0.5, 1), hasGift));
    }
    startPosX-=1;
}
//------------- End Loading Enemies

//----Loading Stars
//var pos;
//for(var i = 0; i<=99; i++){
//    pos = 55;//random(20, 380);
//    star.push(new Star(pos, pos, pos+2.5, pos-2.5, pos-2.5, pos-2.5));
//    star.push(new Star(pos, pos-3.5, pos+2.5, pos-1, pos-2.5, pos-1));
    //star.push(new Star(200,200,225,175,175,175)); 
    //star.push(new Star(200,165,225,190,175,190));
//}

//---------------End Loading Stars

//---Principal loop
var draw = function() {
    
    background(26, 19, 26);

    if(energy.points>0&&invaders.length>0){
        
        aircraft.draw(mouseX, mouseY);
        
        for(var i = 0; i < invaders.length; i++){
            invaders[i].draw();
            if(invaders[i].posX<=0){
                energy.points-=100;
                invaders.splice(i,1);
            }
        }
        
        for(var i = 0; i < gift.length; i++){
            aircraft.getGift(gift[i]);
            gift[i].draw();
            if(gift[i].posX<=0 || gift[i].posY>=400){
                energy.points+=50;
                gift.splice(i,1);
            }
        }    
        
        for(var i = 0; i < shoot.length; i++){
            shoot[i].draw();
            for(var j = 0; j < invaders.length; j++){
                shoot[i].collision(invaders[j], i);
                if(invaders[j].energy<=0){
                    score.points+=10;
                    if(invaders[j].hasGift ===true){
                        gift.push(new Gift(invaders[j].posX, invaders[j].posY, 0, 0, getImage("cute/Heart")));
                    }
                    invaders.splice(j,1);
                }
            }
            if(shoot[i].posX>=400){
                shoot.splice(i,1);
            }
        }
    }
    else if(invaders.length===0&&aircraft.energy>0)
    {
        bigSavior.draw();
        youWin.draw();        
    }
    else
    {
        bigInvader.draw();
        youLose.draw();
    }
    
    score.draw();
    energy.draw();
    enemies.points = invaders.length;
    enemies.draw();
};

var mouseClicked = function(){
    shoot.push(new Shoot(aircraft.posX, aircraft.posY, 0, 0, aircraft.currentPower));
};