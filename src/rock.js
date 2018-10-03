  const rockArray = [ ]


  class Rock {

    constructor(rockObj){
      this.x = rockObj.x
      this.y = rockObj.y
      this.radius = rockObj.radius
      this.dx = rockObj.dx
      this.dy = rockObj.dy
      this.color = rockObj.color
      this.visible = rockObj.visible
      rockArray.push(this)

    }

    renderSingle(ctx){
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
    }


    static renderAll(ctx, shipImage){
      rockArray.forEach((rock, index)=>{

        if (rock.visible){
        ctx.beginPath()
        ctx.drawImage(shipImage, rock.x-rock.radius, rock.y- rock.radius, rock.radius*2, rock.radius*2)
        // ctx.arc(rock.x, rock.y, rock.radius, 0, Math.PI*2)
        // ctx.fillStyle = rock.color
        // ctx.fill()
        ctx.closePath()

        //   if (hitCounter > 1){
        //   ctx.drawImage(rockImage, r.x-r.radius, r.y-r.radius, r.radius*2, r.radius*2)
        // }else{


        //check for screen collision
        //x axis collision
        if ((rock.x <rock.radius) || ((rock.x + rock.radius) > canvas.width)){
          rock.dx = -rock.dx
        }


        //animate
        rock.y += rock.dy
        rock.x += rock.dx
      }
        //delete rock from array if it goes off the screen
        if ((rock.y > canvas.height)||rock.visible == false){
          rockArray.splice(index,1)
        }

      })




    }//end render all










  } //end class
