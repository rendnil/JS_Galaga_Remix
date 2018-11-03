//class for displaying some of the messages
class Message{

  static levelMessage(ctx, level){
    ctx.font = "24px 'Press Start 2p'";
    ctx.fillStyle = "white";
    ctx.fillText("Level: "+level, 100, 100);
}

  static show_instructions(ctx){
    const rickAndMortyImage = document.getElementById("rick-and-morty")
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

} //end class
