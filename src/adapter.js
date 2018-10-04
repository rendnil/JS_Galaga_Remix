const userEndPoint = "http://localhost:3000/api/v1/users"
const gameEndPoint = "http://localhost:3000/api/v1/games"


  class Adapter {


    static fetchUsers(){
      return(fetch(userEndPoint)
      .then(response => response.json())
      )
    }


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
