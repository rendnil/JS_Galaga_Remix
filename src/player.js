
class Player {

  constructor(playerObj){
    this.x = playerObj.x
    this.y = playerObj.y
    this.radius = playerObj.radius
    this.dx = playerObj.dx
    this.dy = playerObj.dy
  }

  render(ctx, playerImage){
    ctx.beginPath()
    ctx.drawImage(playerImage, this.x-this.radius, this.y - this.radius, this.radius*2,this.radius*2)
    ctx.closePath()
  }



} //end class
