document.addEventListener("DOMContentLoaded", ()=>{

  let gameInProgress = false

  const startButton = document.getElementById("start-game")
  startButton.addEventListener("click", start_game)

  function start_game(){
    canvas.style = "display:block"
    startButton.style = "display:none"
    gameInProgress = true
    draw()
  }


  const canvas = document.getElementById('canvas')
  const canvas2 = document.getElementById("canvas2")
  const ctx2 = canvas2.getContext("2d")
  const ctx = canvas.getContext('2d')


//image elements
  const coinImage = document.getElementById("coin-img")
  const rockImage = document.getElementById("y-img")
  const ship1Image = document.getElementById("ship1-img")
  const burnerImage = document.getElementById("burner-img")
  const rayImage = document.getElementById("ray-img")
  const redRayImage = document.getElementById("red-ray-img")
  const ship4Image = document.getElementById("ship4-img")
  const xwingImage = document.getElementById("xwing-img")
  const tiefighterImage = document.getElementById("tie-fighter-img")
  const droidfighterImage = document.getElementById("doid-fighter-img")
  const darthVaderImage = document.getElementById("darth-vader-img")
  const benderImage = document.getElementById("bender-img")

  let laser = new Sound("./public/laser3.wav")

  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)

  //ctx.canvas.width = window.innerWidth
  //ctx.canvas.height = window.innerHeight

  //level
  let level = 1


  //initial images to use
  let enemyImage = ship4Image
  let playerImage = ship1Image
  let bulletImage = rayImage


  //initial ship specs
  let shipX = canvas.width/2
  let shipY = canvas.height * (0.9)

  let shipDx = 5
  let shipDy = 5

  //create player
  let player = new Player({x: shipX, y:shipY, radius: 25, dx: shipDx, dy:shipDy})

  //initial bullet specs
  let bulletRadius = 3
  let bulletDy = 5
  let bulletDelay = 5

  let bulletType = 1


  //initial rock specs
  let rockRadius = 10
  let rockDy = 2
  let rockDelay = 120

  //score
  let hitCounter = 0

  //frame timer
  let timer = 0

  //button presses checks
  let rightPressed = false
  let leftPressed = false
  let downPressed = false
  let upPressed = false
  let spacePressed = false

  //sprite rendering
  function renderCoin(){
    let portion = timer % 10
    ctx.drawImage(coinImage, portion * (coinImage.width/10),0, 46, coinImage.height, canvas.width/2, canvas.height/2, coinImage.width/10, coinImage.height)
  }


  function rand(){
    return Math.random()
  }


  function determineLevel(){
    if (hitCounter >2 && hitCounter<=5){
      level = 2
      enemyImage = droidfighterImage
      playerImage = xwingImage
      bulletType = 2
      bulletImage = redRayImage
      rockDelay = 60
        if (hitCounter ===3){
          levelMessage()
        }

    }else if (hitCounter>5){
      level = 3
      bulletDelay = 1
      enemyImage = tiefighterImage
      if (hitCounter ===6){
        levelMessage()
      }
    }
  }

  function levelMessage(){

    ctx.font = "24px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.fillText("Level: "+level, 100, 100);

  }

  function gameOver(){
    gameInProgress = false
    ctx.font = "32px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.drawImage(darthVaderImage, 125, 50, 250, 200)
    ctx.fillText("GAME OVER", 100, 300);

  }

  function drawLevel(){
    ctx.font = "12px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.fillText("Level: "+level, 8, 20);
  }

  function drawScore() {
  ctx.font = "12px 'Press Start 2p'";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+hitCounter, 380, 20);
  }

  function drawHitPercentage(){
    ctx.font = "12px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.fillText("Hit%: "+Math.floor((100*hitCounter/bulletCounter))+"%", 380, 50);
  }


  function drawPlayer(){
    player.render(ctx, playerImage)
  }

  function drawInitialBullet(){


    if (bulletType ===1){
      let newBullet = new Bullet({x: player.x, y:(player.y-player.radius), radius: bulletRadius, dx: 0, dy: bulletDy, color: "red", visible: true})
      newBullet.renderSingle(ctx, rayImage)

      //shoot dual bullets
    }else if(bulletType ===2){
      let newBullet1 = new Bullet({x: player.x-(1.1*player.radius), y:(player.y-player.radius), radius: bulletRadius, dx: 0, dy: bulletDy, color: "red", visible: true})
      let newBullet2= new Bullet({x: player.x+(0.9*player.radius), y:(player.y-player.radius), radius: bulletRadius, dx: 0, dy: bulletDy, color: "red", visible: true})

    }



    //play the laser sound effect
    //laser.play()
  }

  function drawBullets(){

    Bullet.renderAll(ctx, bulletImage)

  }

  function drawInitialRock(){
    let newRock = new Rock({x: rand()*(canvas.width), y: (rand()*canvas.height)*0.25, dx:(rand()*3), dy:(rand()*3), radius:(rand()*rockRadius)+15, color: "green", visible: true})
    newRock.renderSingle(ctx)
  }

  function drawRocks(){
    Rock.renderAll(ctx, enemyImage)
  }


  function checkBulletCollision(){
    bulletArray.forEach((bullet)=>{
      rockArray.forEach((rock)=>{
        if((bullet.x>(rock.x- rock.radius))&&(bullet.x< (rock.x + rock.radius))&&(bullet.y>(rock.y-rock.radius))&&(bullet.y<(rock.y+rock.radius))){
          rock.visible = false
          bullet.visible = false
          hitCounter++
        }
      })
    })
  }

  //check for collision of ship with enemy
  function checkShipCollision(){
    rockArray.forEach((rock)=>{

      if((rock.x>(player.x-player.radius)) && (rock.x<(player.x+player.radius)) && (rock.y> (player.y-player.radius)) && (rock.y< (player.y+player.radius)) ){
        gameOver()


      }
    })
  }


  function generateStar(canvas, ctx, starRadius){
			ctx.beginPath();
			ctx.arc(starRadius + (Math.random() * canvas.width), starRadius + (Math.random() * canvas.height), starRadius*Math.random(), 0, Math.PI*2, false);
      //ctx.arc(100, 30, starRadius, 0, Math.PI*2, false);

      let rand = Math.random();
      if(rand <= 0.5){
				  ctx.fillStyle = "rgba(255, 255, 255, 1)";
				  ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
				  ctx.shadowBlur = 3;
			}
			else if(rand > 0.75){
				  ctx.fillStyle = "rgba(255, 254, 196, 1)";
				  ctx.shadowColor = "rgba(255, 254, 196, 0.5)";
				  ctx.shadowBlur = 4;
			}
			else{
				  ctx.fillStyle = "rgba(192, 247, 255, 1)";
				  ctx.shadowColor = "rgba(192, 247, 255, 0.5)";
				  ctx.shadowBlur = 7;
			}
			ctx.fill();
	}

  function drawBackground(){

    if (timer < 90){
      generateStar(canvas2, ctx2, 5)
      requestAnimationFrame(drawBackground)

    }
  }


///////////////main drawing loop ////////////////////////

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    determineLevel()
    //rendering functions
    drawScore()
    drawHitPercentage()
    drawLevel()
    drawPlayer()
    drawRocks()
    drawBullets()

    // collision check functions
    checkBulletCollision()
    checkShipCollision()


    //initial images and text
    if (timer <50){
      ctx.drawImage(benderImage, 0, 300, 100, 200)

      ctx.font = "32px 'Press Start 2p'";
      ctx.fillStyle = "white";
      ctx.fillText("START GAME", 100, 200);

    }

    // if (hitCounter === 2){
    //   ctx.font = "16px 'Press Start 2p'";
    //   ctx.fillStyle = "white";
    //   ctx.fillText("NEW SHIP", canvas.width*0.3, canvas.height/2);
    // }

    // now we deploy a rock
    if (timer %rockDelay===0){
      drawInitialRock()
    }

    ////////////////////////////movements
    //right movement
    if (rightPressed && ((player.x+player.radius) < canvas.width)){
      player.x +=player.dx
    }

    //left movement
    if (leftPressed && (player.x>player.radius)){
      player.x -= player.dx
    }

    //up movement
    if (upPressed && (player.y>player.radius)){
      player.y -= player.dy
      ctx.drawImage(burnerImage,player.x-(player.radius*0.4), player.y+player.radius, 20, 20)
    }

    //down movement
    if (downPressed && ((player.y+player.radius)<canvas.height)){
      player.y += player.dy

    }
    //////////////////////////////////////////////////

    //shoot
    if (spacePressed && timer %bulletDelay===0){
      drawInitialBullet()
    }


    if (gameInProgress){
    requestAnimationFrame(draw)

    }

    timer++

  }//end draw


  ///////function for checking keys
  function keyDownHandler(e) {
  //right
    if(e.keyCode == 68) {
    rightPressed = true;
    //left
  }else if(e.keyCode == 65) {
    leftPressed = true;
    //up
  }else if (e.keyCode == 87){
      upPressed = true;
    //down
  }else if (e.keyCode == 83){
      downPressed = true;
    //space bar
  }else if (e.keyCode == 74){
      spacePressed = true
    }
  }

  function keyUpHandler(e) {
    //right
    if(e.keyCode == 68) {
      rightPressed = false;
      //left
    }else if(e.keyCode == 65) {
      leftPressed = false;
      //up
    }else if (e.keyCode == 87){
        upPressed = false;
      //down
    }else if (e.keyCode == 83){
        downPressed = false;

    //j pressed for shoot
  }else if (e.keyCode == 74){
      spacePressed = false
    }
  }











}) //end main event listener
