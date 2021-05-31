var towerImg, tower;
var doorImg, door, doorGrp;
var climberImg, climber, climbGrp;
var ghostImg1, ghostImg2, ghost;
var invisible, invisibleGrp;
var endSound;
var GameState = "play";

function preload (){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  ghostImg1 = loadImage("ghost-standing.png");
  ghostImg2 = loadImage("ghost-jumping.png"); 
  
  endSound = loadSound("spooky.wav");
}

function setup (){
  createCanvas(600, 600);
  
  endSound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 300, 50, 50);
  ghost.addImage("ghost", ghostImg1);
  ghost.scale = 0.3;
  
  doorGrp = new Group();
  climbGrp = new Group(); 
  invisibleGrp = new Group();
  
}

function draw(){
  background(0);
  
  if(GameState === "play"){
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 5;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 5;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(ghost.isTouching(climbGrp)){
    ghost.velocityY = 0;
  }
  
  if(invisibleGrp.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    GameState = "end";
  }
    
  spawnDoor();
  
  drawSprites();
    
  } 
  
  if(GameState === "end"){
    stroke("cyan");
    fill("cyan");
    textSize(40);
    text("Game Over", 220, 300);
  }
}

function spawnDoor(){
  
  if(frameCount % 240 === 0){
    door = createSprite(200, -50);
    door.addImage("door", doorImg);
    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);
    invisible = createSprite(200,10);
    invisible.width = climber.width;
    invisible.height = climber.height;
    
    door.x = Math.round(random(100, 400));
    door.velocityY = 1;
    climber.x = door.x;
    climber.velocityY = 1;
    invisible.x = door.x;
    invisible.velocityY = 1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisible.lifetime = 800;
    
    doorGrp.add(door);
    climbGrp.add(climber);
    invisible.debug = true;
    invisibleGrp.add(invisible);
    
  }
}