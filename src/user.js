
 userStore = [ ]


 class User {

   constructor(userObj){
     this.name = userObj.name
     this.games = userObj.games
     userStore.push(this)
   }


   static renderNames(ctx){
     ctx.clearRect(0,0,canvas.width, canvas.height)
     ctx.font = "12px Times"
     userStore.forEach((user, index)=>{
       ctx.fillStyle = "white";
       ctx.fillText(`${user.name} Score: ${user.games[0].score}`, 100, ((index*15)+20));
      })
   }

    static gameScore(game){
      let scoreArray = [ ]
      userStore.forEach((user)=>{
        user.games.forEach((gameElement)=>{
          if (gameElement.name === game){
            scoreArray.push({name:user.name, score:gameElement.score})
          }

        })

      })
      let sortedScoreArray = scoreArray.sort((a,b)=>{
        return (b.score-a.score)
      })
      return sortedScoreArray.slice(0,5)
    }

    static renderHighScore(ctx, gameTitle){
      let scores = this.gameScore(gameTitle)
      ctx.fillStyle = "white";
      ctx.font = "16px 'Press Start 2p'"
      ctx.fillText("High Scores", 155, 365)

      ctx.font = "10px 'Press Start 2p'"
      ctx.fillText("Rank", 70, 385)
      ctx.fillText("Name", 210, 385)
      ctx.fillText("Score", 380, 385)


      ctx.font = "8px 'Press Start 2p'"
      scores.forEach((user, index)=>{
        ctx.fillText(`${index+1}`, 85, ((index*15)+400));
        ctx.fillText(`${user.name}`, 210, ((index*15)+400));
        ctx.fillText(`${user.score}`, 395, ((index*15)+400));
      })


    }





 } //end class
