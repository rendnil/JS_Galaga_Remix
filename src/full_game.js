document.addEventListener("DOMContentLoaded", ()=>{




  //fetch the existing users
  Adapter.fetchUsers().then((data) => {
      data.forEach((user)=>{
        let new_user = new User(user)
      })
    })


  let userObj = 0

  let gameInProgress = false

  const startButton = document.getElementById("start-game")
  startButton.addEventListener("click", start_game)

  const instructionsButton = document.getElementById("instructions")
  instructionsButton.addEventListener("click", show_instructions)

  const startForm = document.getElementById("start-form")
  const formName = document.getElementById("form-name")





  function start_game(){

    startButton.style = "display:none"
    instructionsButton.style = "display:none"
    startForm.style = "display:none"

    //post user

    let userName = formName.value
    Adapter.postUser(userName).then(response => response.json())
    .then(data=> {
      userObj = new User(data)

    })
    gameInProgress = true
    draw()
  }



  const canvas = document.getElementById('canvas')
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
  const planetExpressImage = document.getElementById("planet-express-img")
  const flameImage = document.getElementById("flames")
  const rickAndMortyImage = document.getElementById("rick-and-morty")

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
  let enterPressed = false


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

    }else if (hitCounter>5 && hitCounter <=10){
      level = 3
      enemyImage = tiefighterImage
      rockDelay = 40
      if (hitCounter ===6){
        levelMessage()
      }

    }else if (hitCounter > 10 && hitCounter <=100){
      level = 4

      bulletDelay = 1
      bulletType = 1
      bulletRadius = 10
      rockDelay = 10

      playerImage = planetExpressImage
      if (hitCounter === 11){
        levelMessage()
      }
    } else if (hitCounter > 100){
      level = 5

      bulletType = 2
      playerImage = xwingImage
      rockDelay = 5

      if (hitCounter === 100){
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

    //post game
    let currentUser = userStore[userStore.length-1]
    let gameObj = {name: "shooter", user_id: currentUser.id, score: hitCounter, hit_percentage:hitCounter/bulletCounter}
    Adapter.postGame(gameObj)
    currentUser.games.push(gameObj)



    User.renderHighScore(ctx, "shooter")

    gameInProgress = false
    ctx.font = "32px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.drawImage(darthVaderImage, 125, 50, 250, 200)
    ctx.fillText("GAME OVER", 100, 300);
    User.renderHighScore(ctx, "shooter")
  }



  function show_instructions(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = "24px Times";
    ctx.fillStyle = "white";
    ctx.fillText("Keyboard Controls", 150, 100);
    ctx.font = "18px Times"
    ctx.fillText("Up: W", 100, 150);
    ctx.fillText("Down: S", 100, 175);
    ctx.fillText("Left: A", 100, 200);
    ctx.fillText("Right: D", 100, 225);
    ctx.fillText("Shoot: J", 250, 150);
    ctx.drawImage(rickAndMortyImage, 275, 200, 200, 300)

  }

  function drawLevel(){
    ctx.font = "12px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.fillText("Level: "+level, 8, 20);
  }

  function drawScore() {
  ctx.font = "12px 'Press Start 2p'";
  ctx.fillStyle = "white";
  ctx.fillText("Score: "+hitCounter, 375, 20);
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

  // function explode() {
  //   let wfactor = 0
  //   let currentTimer = timer
  //   while (timer <= currentTimer+90) {
  //     ctx.clearRect(0,0,canvas.width, canvas.height)
  //     ctx.drawImage(flameImage, 64 * wfactor, 0, 64, 64, 250, 250, 64, 64)
  //     wfactor++
  //
  //
  //     }
  //     //wfactor = 0
  //   }



  function checkBulletCollision(){
    bulletArray.forEach((bullet)=>{
      rockArray.forEach((rock)=>{
        if((bullet.x>(rock.x- rock.radius))&&(bullet.x< (rock.x + rock.radius))&&(bullet.y>(rock.y-rock.radius))&&(bullet.y<(rock.y+rock.radius))){
          rock.visible = false
          bullet.visible = false
          ctx.drawImage(flameImage, 64, 0, 64, 64, rock.x-rock.radius, rock.y-rock.radius, 64, 64)
          ctx.drawImage(flameImage, 64, 0, 64, 64, rock.x-rock.radius, rock.y-rock.radius, 64, 64)
          ctx.drawImage(flameImage, 64, 0, 64, 64, rock.x-rock.radius, rock.y-rock.radius, 64, 64)
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



    //rendering functions
    determineLevel()
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
      ctx.fillText(`${userObj.name}`, 100, 300);

    }

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
    }else if (e.keyCode ==13){
      enterPressed = true
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
    }else if (e.keyCode == 13){
      enterPressed = false
    }
  }











}) //end main event listener
