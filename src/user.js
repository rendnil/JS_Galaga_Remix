//store for existing users
 userStore = [ ]


 class User {

   constructor(userObj){
     this.id = userObj.id
     this.name = userObj.name
     this.games = userObj.games
     userStore.push(this)
   }

//methods for rendering the high scores list at the end of the game

//method for creating array of users descending by score
    static gameScore(game){
      let scoreArray = [ ]

      //iterate over the user store
      userStore.forEach((user)=>{
        user.games.forEach((gameElement)=>{
          if (gameElement.name === game){
            scoreArray.push({name:user.name, score:gameElement.score})
          }
        })
      })
      //sort the array descending by score
      let sortedScoreArray = scoreArray.sort((a,b)=>{
        return (b.score-a.score)
      })
      //just return the top 5 highest scorers
      return sortedScoreArray.slice(0,5)
    }

    //method for drawing the highs score list on the canvas
    static renderHighScore(ctx, gameTitle){
      let scores = this.gameScore(gameTitle)
      ctx.fillStyle = "white";
      ctx.font = "16px 'Press Start 2p'"
      ctx.fillText("High Scores", 155, 365)

      //column headers
      ctx.font = "10px 'Press Start 2p'"
      ctx.fillText("Rank", 70, 400)
      ctx.fillText("Name", 210, 400)
      ctx.fillText("Score", 380, 400)

      //individual scores
      ctx.font = "8px 'Press Start 2p'"
      scores.forEach((user, index)=>{
        ctx.fillText(`${index+1}`, 85, ((index*15)+415));
        ctx.fillText(`${user.name}`, 210, ((index*15)+415));
        ctx.fillText(`${user.score}`, 395, ((index*15)+415));
      })
    }
 } //end class
