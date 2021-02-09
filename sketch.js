var gameState = "play";



var sword, swordImage

var fruit, fruit1, fruit2, fruit3, fruit4, fruitGrp;
var enemy, alien, enemyGrp;

var score = 0;

function preload() {

  swordImage = loadImage("sword.png")

  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  gameOver = loadImage("gameover.png")

  alien = loadAnimation("alien1.png", "alien2.png")
}

function setup() {
  createCanvas(400, 400);

  sword = createSprite(100, 200, 20, 20)
  sword.addImage(swordImage)
  sword.scale = 0.5
  
  fruitGrp = createGroup();
  enemyGrp = createGroup();
}

function draw() {
  background("lightGreen")

  text("score: " + score, 300, 50);
  
  if (gameState == "play") {
    sword.x = mouseX;
    sword.y = mouseY;
    
    Fruits()
    Enemy()

    if(sword.isTouching(fruitGrp)){
      fruitGrp.destroyEach();
      score = score + 10
    }
    
    if(sword.isTouching(enemyGrp)){
      enemyGrp.destroyEach();
      gameState = "end";
    }
  }
  
  else{
    sword.addImage(gameOver)
    sword.x = 200;
    sword.y = 200;
  }
  
  drawSprites();
}

function Fruits() {

  if (frameCount % 80 == 0) {
    fruit = createSprite(0, Math.round(random(10, 380)), 30, 30)
    fruit.velocityX = 4;

    var r = Math.round(random(1, 4));
    switch (r) {
      case 1:
        fruit.addImage(fruit1);
        break;
      case 2:
        fruit.addImage(fruit2);
        break;
      case 3:
        fruit.addImage(fruit3);
        break;
      case 4:
        fruit.addImage(fruit4);
        break;

      default:
        break;
    }

    fruit.scale = 0.2;
    fruit.lifetime = 100
    fruitGrp.add(fruit)
  }

}

function Enemy() {

  if(frameCount % 200 == 0) {
    enemy = createSprite(400, Math.round(random(10, 380)), 30, 30)
    enemy.velocityX = -6;
    enemy.addAnimation("alien", alien);
    enemy.lifetime =  100;
    enemyGrp.add(enemy);
    
  }
}