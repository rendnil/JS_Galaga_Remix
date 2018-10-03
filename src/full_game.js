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

  const coinImage = document.getElementById("coin-img")
  const rockImage = document.getElementById("y-img")
  const shipImage = document.getElementById("ship-img")
  const burnerImage = document.getElementById("burner-img")
  const rayImage = document.getElementById("ray-img")
  const ship4Image = document.getElementById("ship4-img")

  //ctx.canvas.width = window.innerWidth
  //ctx.canvas.height = window.innerHeight



  //ship specs
  let shipX = canvas.width/2
  let shipY = canvas.height * (0.9)
  let xFromCenter = 12.5
  let yUpFromCenter = 33
  let yDownFromCenter = 17

  let shipDx = 5
  let shipDy = 5

  //bullet specs
  let bulletRadius = 3
  let bulletDy = 5
  let bulletDelay = 5


  //rock specs
  let rockRadius = 10
  let rockDy = 2
  let rockDelay = 120

  //score
  let hitCounter = 0


  let timer = 0

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

  function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+hitCounter, 8, 20);
  }

  function drawHitPercentage(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Hit Percentage: "+Math.floor((100*hitCounter/bulletCounter))+"%", 335, 20);
  }


  function drawShip(){
    ctx.beginPath()
    //ctx.drawImage(shipImage, shipX-xFromCenter, shipY-yUpFromCenter, 50, 75)
    ctx.drawImage(shipImage, shipX-xFromCenter, shipY-yUpFromCenter, xFromCenter*2, yDownFromCenter + yDownFromCenter)
    // ctx.moveTo(shipX, shipY-yUpFromCenter)
    // ctx.lineTo(shipX - xFromCenter, shipY+yDownFromCenter)
    // ctx.lineTo(shipX + xFromCenter, shipY + yDownFromCenter)
    // ctx.fillStyle = "rgba(255, 255, 255, 1)"
    // ctx.fill()
    ctx.closePath()

  }

  function drawInitialBullet(){
    let newBullet = new Bullet({x: shipX, y:(shipY-yUpFromCenter), radius: bulletRadius, dx: 0, dy: bulletDy, color: "red", visible: true})
    newBullet.renderSingle(ctx)
  }

  function drawBullets(){
    Bullet.renderAll(ctx, rayImage)
  }

  function drawInitialRock(){
    let newRock = new Rock({x: rand()*(canvas.width), y: (rand()*canvas.height)*0.25, dx:(rand()*3), dy:(rand()*3), radius:(rand()*rockRadius)+15, color: "green", visible: true})
    newRock.renderSingle(ctx)
  }

  function drawRocks(){
    Rock.renderAll(ctx, ship4Image)
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

      if((rock.x>(shipX-xFromCenter)) && (rock.x<(shipX+xFromCenter)) && (rock.y> (shipY-yUpFromCenter)) && (rock.y< (shipY+yDownFromCenter)) ){
        //alert("you suck")
        gameInProgress = false
        canvas.style = "display:none"

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

  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    drawShip()
    drawScore()
    drawRocks()
    drawHitPercentage()


    //renderCoin()


    //right movement
    if (rightPressed && ((shipX+xFromCenter) < canvas.width)){
      shipX +=shipDx
    }

    //left movement
    if (leftPressed && (shipX>xFromCenter)){
      shipX -=shipDx
    }

    //up movement
    if (upPressed && (shipY>yUpFromCenter)){
      shipY -= shipDy
      ctx.drawImage(burnerImage,shipX-(xFromCenter*0.75), shipY+yDownFromCenter, 20, 20)
    }

    //down movement
    if (downPressed && ((shipY+yDownFromCenter)<canvas.height)){
      shipY += shipDy

    }

    //shoot
    if (spacePressed && timer %bulletDelay===0){
      drawInitialBullet()
    }

    //loop over the bullets and draw them
    drawBullets()
    checkBulletCollision()
    checkShipCollision()






    // now we deploy a rock
    if (timer %rockDelay===0){
      drawInitialRock()
    }


    if (gameInProgress){
    requestAnimationFrame(draw)

    }

    timer++

  }//end draw



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



  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)







  })
