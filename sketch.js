var mario, mario_running, mario_collided;
var bg, bgImage;
var bricksGroup , brickImage;
var coinScore = 0;
var obsGroup,obs,turtleObsImage,mushObsImage;

function preload(){
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
  brickImage = loadImage("images/brick.png");
  coinImage =loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
mushObsImage= loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png");
turtleObsImage= loadAnimation("tur1.png","tur2.png","tur3.png","tur4.png","tur5.png");
dieSound= loadSound("sounds/dieSound.mp3");
jumpSound= loadSound("sounds/jump.mp3");
}

function setup() {
  createCanvas(1000, 600);
 bricksGroup = new Group();
  coinsGroup = new Group();
  obsGroup = new Group();
  coinSound = createAudio("sounds/coinSound.mp3");
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;

  bg.velocityX = -6;
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale =0.3;

  ground = createSprite(200,585,400,10);

  ground.visible = false;
}

function draw() {

  if (bg.x < 100){
    bg.x=bg.width/4;
  }
  if(keyDown("space") ) {
    mario.velocityY = -16;
  }
  if(mario.y<50){
    mario.y=50;
  }
  if(mario.x<200){
    mario.x=200;
  }
  mario.velocityY = mario.velocityY + 0.5;
  mario.collide(ground);

generateBricks();
for(var i =0; i<bricksGroup.length;i++){
  var temp = (bricksGroup).get(i);
  if(temp.isTouching(mario)){
    mario.collide(temp);
  }
}

generateCoins();
for(var i =0; i<coinsGroup.length;i++){
  var temp = (coinsGroup).get(i);
  if(temp.isTouching(mario)){
    coinSound.volume(0.1);
coinSound.play();
coinScore++;
temp.destroy();
temp = null;

  }

}


generateObs();


  drawSprites();
  textSize(25);
  fill("white");
  text("Coins Collected : "+coinScore,500,50);
}



function generateBricks(){
  if(frameCount % 40 == 0){
  var brick = createSprite(1200,random(50,450),random(15,30),15);
  brick.addImage(brickImage);
  brick.scale= 0.5;
    brick.velocityX = -8;
    brick.lifetime = 250;
    bricksGroup.add(brick);
  }
}


function generateCoins(){
  if(frameCount % 20 == 0){
  var coins = createSprite(1200,random(80,350),40,10);
  coins.addAnimation("coin",coinImage);
  coins.scale= 0.1;
    coins.velocityX = -8;
    coins.lifetime = 550;
    coinsGroup.add(coins);
  }
}

function generateObs(){
  if(frameCount % 100 == 0){
  var obs = createSprite(1200,550,10,40);
  var rand = Math.round(random(1,2));
  switch(rand){
    case 1:
    obs.addAnimation("mush",mushObsImage);
    break;
    case 2:
     obs.addAnimation("tur",turtleObsImage);
     break;
     default:
     break;
  }

  obs.scale= 0.2;
    obs.velocityX = -4;
    obs.lifetime = 550;
    obsGroup.add(obs);
  }
}
