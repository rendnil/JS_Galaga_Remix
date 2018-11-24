// const userEndPoint = "http://localhost:3000/api/v1/users"
// const gameEndPoint = "http://localhost:3000/api/v1/games"
const userEndPoint = "https://damp-stream-64267.herokuapp.com/api/v1/users"
const gameEndPoint = "https://damp-stream-64267.herokuapp.com/api/v1/games"

  class Adapter {

//method for fetching user data
    static fetchUsers(){
      return(fetch(userEndPoint)
      .then(response => response.json())
      )
    }

//method for posting new user information
    static postUser(userName){
      return(fetch(userEndPoint,
        {method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },//end headers
        body: JSON.stringify({
          name: userName})
        }//end options

        ) //end fetch
      )
    }

//method for posting new game information
    static postGame(gameObj){
      return(fetch(gameEndPoint,
        {method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },//end headers
        body: JSON.stringify(gameObj)
        }//end options

        ) //end fetch
      )
    }



  } //end adapter class
