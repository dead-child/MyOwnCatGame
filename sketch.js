var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var cat_running, cat, cat_collided, cat_still

var obstaclesGroup, obstacle1;

var score=0;

var invisibleline, invisiblelineGroup
var box , boxGroup, boxImage

var gameOver, restart;

function preload(){
  cat_running =   loadAnimation("assets/cat1.png","assets/cat2.png","assets/cat3.png","assets/cat4.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  boxImage = loadImage("assets/box.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
  catCollided = loadImage("assets/fallen.cat")
  cat_still = loadAnimation("assets/cat3.png")

  //boxImage= loadImage("assets/box.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  jungle = createSprite(400,300,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.8
  jungle.x = width /2;

  cat = createSprite(1000,100,20,50);
  cat.addAnimation("running", cat_running);
  cat.scale = 0.5;
  cat.setCollider("circle",0,0,30)

  invisibleGround = createSprite(600,240,1600,10);
  invisibleGround.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  invisiblelineGroup  = new Group();
  score = 0;

}

function draw() {
  background(255);
  
 // cat.x=camera.position.x+400;
   
  if (gameState===PLAY){

   // jungle.velocityX= 4

    if(jungle.x>500)
    {
       jungle.x=100
    }

   //console.log(cat.y)
   

  if(cat.isTouching(invisiblelineGroup)){
 //console.log("hello")
 cat.velocityX=0
 cat.velocityY=0
 invisiblelineGroup.setVelocityX(0)
    }

   if(keyDown("RIGHT_ARROW")){
    cat.x = cat.x + 5
    jungle.x = jungle.x - 6
   }

   if(keyDown("LEFT_ARROW")){
    cat.x = cat.x - 5
    jungle.x = jungle.x + 6
    shrubsGroup.x = shrubsGroup.x + 6
   }

   if(keyDown("UP_ARROW")&&cat.y>=160){
    cat.velocityY = cat.velocityY - 1.8
   }

   cat.velocityY = cat.velocityY + 0.8

    cat.collide(invisibleGround);

    if(shrubsGroup.isTouching(cat)){
      shrubsGroup.destroyEach();
    }
  }

  else if (gameState === END) {
    //set velcity of each game object to 0
    cat.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    //change the trex animation
    cat.changeAnimation("still",cat_still);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
  }

  spawnShrubs();
  spawnObstacles();

  drawSprites();

}

function spawnShrubs() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x-500,240,40,10);

   // shrub.velocityX = (6 - 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the shrub           
    shrub.scale = 0.05;
     //assign lifetime to the variable
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    //add each cloud to the group
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

  var obstacle = createSprite(400,240,40,40);
  invisibleline = createSprite(400,200, 30,5)
  invisibleline.debug = true;

  invisibleline.velocityX = 5

  obstacle.setCollider("rectangle",0,0,200,200)
  obstacle.addImage(boxImage);
  obstacle.velocityX = 5
  obstacle.scale = 0.30;
 //assign scale and lifetime to the obstacle           
 
    obstacle.lifetime = 400;
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
    invisiblelineGroup.add(invisibleline)
  }
}



