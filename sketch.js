var Bird, Bird_Falling, Bird_Rising, BirdIMG, Bird_FallingIMG, Bird_RisingIMG;

var pipeup,pipeupIMG, pipedown, pipedownIMG,Pipes1Group, Pipes2Group;

var Bg, BgIMG;

var Ground;

var GameOver, Restart, GameOverIMG, ResetIMG;

var Start, StartIMG;

var logo, logoIMG;

var lives; 

var gameState=PLAY;
//var SERVE=0;
var PLAY=1;
var END=0;
var score= 0;

function preload(){

BirdIMG= loadImage("Images/flappybird1.png");
//Bird_FallingIMG= loadImage("Images/Falling_Down.png");
BgIMG= loadImage("Images/background.png");
GameOverIMG= loadImage("Images/gameover.png");
ResetIMG= loadImage("Images/reset.png");
pipeupIMG= loadImage("Images/pipeup.png");
pipedownIMG= loadImage("Images/pipedown.png");
StartIMG= loadImage("Images/start.png");
logoIMG= loadImage("Images/logo.png");
}

function setup(){
createCanvas(1200,740);

Bird= createSprite(300,300,20,20);
Bird.addImage("Bird",BirdIMG);
Bird.scale= 0.5;
    
Bg=createSprite(740,350,1200,740);
Bg.addImage(BgIMG);
Bg.x = Bg.width/2;
Bg.velocityX=-6;

Ground=createSprite(500,675,1200,25);
Ground.visible= false;
Ground.x=Ground.width/2;
Ground.velocityX=-6;

Restart= createSprite(675,600);
Restart.addImage(ResetIMG);
Restart.scale=0.3;

Start= createSprite(575,400);
Start.addImage(StartIMG);
Start.scale= 0.3;

GameOver= createSprite(675,500);
GameOver.addImage(GameOverIMG);
GameOver.scale= 0.3;

logo= createSprite(575,200,100,100);
logo.addImage(logoIMG);

GameOver.visible=false;
Restart.visible=false;

Pipes1Group=new Group();
Pipes2Group=new Group();

fill("black");  
score=0;

}
function draw(){
//background("lightblue");
textSize(20);
text("SCORE :"+score,1000,100);

if(mousePressedOver(Start)){
    Bird.velocityY = -12 ;
    Start.visible=false;
    logo.visible=false;
    gameState=PLAY;
            }
if(Bg.x<0){
    Bg.x=Bg.width/2;
    }

if(gameState===PLAY){
score = score+Math.round(getFrameRate()/30);  

Bg.velocityX=-4;
    
if(keyDown("space")){
   Bird.velocityY = -12 ;
   }
   Bird.velocityY=Bird.velocityY + 0.8;
   Bird.velocityX=0;


UpPipes();
DownPipes();

if(Bird.isTouching(Pipes1Group) || Bird.isTouching(Ground)||Bird.isTouching(Pipes2Group)){
   gameState=END;
    }

}   
if(gameState=== END){
   GameOver.visible=true
   Restart.visible=true
   Bird.velocityX=0;
   Bg.VelocityX=0;
   Ground.velocityX=0;
  Pipes1Group.setvelocityXeach(0);
  Pipes2Group.setvelocityXeach(0);
}
if(mousePressedOver(Restart)) {
    reset();  
  }
 
drawSprites();
}

function reset(){
    gameState=PLAY;
    GameOver.visible=false;
    Restart.visible=false;
    Pipes1Group.destroyEach();
    Pipes2Group2.destroyEach();

  }

function UpPipes(){
    if(frameCount%75===0){
    pipeup=createSprite(1200,250,40,100);
    pipeup.addImage(pipedownIMG);
    pipeup.y=Math.round(random(0,50));
    pipeup.velocityX=-4;
    pipeup.scale=0.6;
    Pipes1Group.add(pipeup);
    }
}

function DownPipes(){
    if(frameCount%75===0){
    pipedown=createSprite(1200,500,40,100);
    pipedown.addImage(pipeupIMG);
    pipedown.y=Math.round(random(600,740));
    pipedown.velocityX=-4;
    pipedown.scale=0.6;
    Pipes2Group.add(pipedown);
    }
}