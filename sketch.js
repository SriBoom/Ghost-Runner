var towerImage, tower;
var doorImage, door, doorsGroup;
var climberImage, climber, climbersGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleGroup;
var spookySound;

var gameState = "play";

function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  //spookySound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  background(180);
  
  if(gameState === "play"){
  
  if(tower.y>400){
     tower.y = 300;
}
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
    if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
    if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  spawnDoors();
  
    if(invisibleGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
  drawSprites();
  }
  
  if(gameState === "end"){
    fill("black");
    textSize(50);
    text("Game Over", 150, 250);
  }
  
}

function spawnDoors(){
  if(frameCount % 240 === 0){
     var door = createSprite(200, -50);
     door.addImage(doorImage);
    
    var climber = createSprite(200, 10);
    climber.addImage(climberImage);
    
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.velocityY = 3;
    door.lifetime = 800;
    door.x = Math.round(random(120, 400));
    
    climber.x = door.x;
    climber.velocityY = 3;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 3;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    ghost.depth = door.depth;
    ghost.depth+=1;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
    invisibleBlock.debug = true;
 }
}