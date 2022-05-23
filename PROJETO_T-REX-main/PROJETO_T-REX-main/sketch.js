 
    var chaoani;
    var chaoinv;
    var rex ;
    var chao;
    var rexani ;
    var nuvem;
    var nuvemani;
    var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
    var jogar=1;
    var end=0;
    var gameState = play;
    var score;
    var gameover,restart,gameOverimg,restartImg;
    var obstaclesgroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
    var cloudsgroup,cloudImg;
    var rexcollide;
function preload(){
  rexani  = loadAnimation("trex1.png","trex3.png","trex4.png");
  rexcollide = loadAnimation("trex_collided.png");
  chaoani = loadImage("ground2.png");
  nuvemani = loadImage("cloud.png");
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restart=loadImage("restart.png");
  
}
function setup(){
  createCanvas(600,200);
  //rex 
  rex = createSprite(30,140,15,10);
  rex.addAnimation("rex", rexani )
  rex.addAnimation("colisão",rexcollide);
  rex.scale=0.7;  
  //chao
  chao = createSprite(300,175,600,10); 
  chao.addImage("chao",chaoani);
  chao.x = chao.width /2;
  chao.velocityX=-4;
  chaoinv = createSprite(200,190,400,10);
  chaoinv.visible = false;
  obstaclesgroup = createGroup();
  cloudsgroup = createGroup();
//gayme over
  gameOver = createSprite(300,100);
  gameOver.loadImage(gameOverImg);
  gameOver.scale=0.5;
//restart
  restart = createSprite(300,140);
  restart.loadImage(restartImg);
  restart.scale = 0.5;

//colisao
  rex.setCollider("circle",0,0,40);
  rex.debug=true;
 


  score=0;
}
function draw(){
  background("180");
  //fill("white") ;
  text(" score " + score,500,50)
  //estados do gayme
if(gameState===jogar){
  gameOver.visible=false;
  restart.visible=false;
    //mover o chao
    chao.velocityX=-4
    //pontuaçao
    
    score = score + Math.round(frameCount/60);
    if(chao.x < 0) {
      chao.x = chao.width/2
  }
     
  

if(keyDown("space")&& rex.y>=100) {
  rex.velocityY=-10;
  }
  rex.velocityY=rex.velocityY + 0.8;
  criarnuvens();
  spawObtacles();



  if(obstaclesgroup.isTouching(rex)){
    gameState = end;
  }
} else if(gameState === end){
  chao.velocityX = 0;
  rex.velocityY=0;
  gameover.visible = true;
  restart.visible = true;
  rex.changeAnimation("collided",rexcollide );
  obstaclesgroup.setLifetimeEach(-1);
  cloudsgroup.setLifetimeEach(-1);

  obstaclesgroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
}


  rex.collide(chaoinv);

  drawSprites();
} 


function criarnuvens(){
  
  if(frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10) ;
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(nuvemani);
    nuvem.scale=0.6;
    nuvem.velocityX = -3;
    nuvem.lifetime=200;
    nuvem.depth = rex.depth;
    rex.depth = rex.depth +1;
    cloudsgroup.add(nuvem);
  }
  

  }
  //OBSTACULO ALEATORIO MANÉ :)
  function spawObtacles()
   { if(frameCount % 60 === 0) { 
     var obstacle = createSprite(400, 165, 10, 40); 
    obstacle.velocityX = -6; 
    //gerar obstáculso aleatórios com switch
  var rand = Math.round(random(1,6)); 
  switch(rand) 
  { case 1: obstacle.addImage(obstaculo1); 
    break;
    case 2: obstacle.addImage(obstaculo2); 
    break; 
    case 3: obstacle.addImage(obstaculo3); 
    break;
    case 4: obstacle.addImage(obstaculo4);
     break;
     case 5: obstacle.addImage(obstaculo5); 
     break;
     case 6: obstacle.addImage(obstaculo6); 
     break; 
     default: break; 
    }
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
     obstaclesgroup.add(obstaculo);
    } 
     
  }
