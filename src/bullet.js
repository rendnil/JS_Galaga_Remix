
  let bulletCounter = 0
  const bulletArray = [ ]


  class Bullet {

    constructor(bulletObj){
      this.x = bulletObj.x
      this.y = bulletObj.y
      this.radius = bulletObj.radius
      this.dx = bulletObj.dx
      this.dy = bulletObj.dy
      this.color = bulletObj.color
      this.visible = bulletObj.visible
      bulletArray.push(this)
      bulletCounter++

    }

    renderSingle(ctx, rayImage){
      ctx.beginPath()
      ctx.drawImage(rayImage, this.x, this.y, this.radius*2, this.radius*2)
      ctx.closePath()

      //ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
      //ctx.fillStyle = this.color
      //ctx.fill()
    }


    static renderAll(ctx, rayImage){
      bulletArray.forEach((bullet, index)=>{

        if (bullet.visible){
        ctx.beginPath()
        // ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI*2)
        // ctx.fillStyle = bullet.color
        ctx.fill()
        ctx.drawImage(rayImage, bullet.x, bullet.y, bullet.radius*2,bullet.radius*2)
        ctx.closePath()
        //animate
        bullet.y -= bullet.dy
      }
        //delete bullet from array if it goes off the screen
        if (bullet.y < 0 || bullet.visible === false){
          bulletArray.splice(index,1)
        }

      })


    }//end render all










  } //end class
