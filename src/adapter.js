const endPoint = "http://localhost:3000/api/v1/users"


  class Adapter {


    static fetch(){
      return(fetch(endPoint)
      .then(response => response.json())
      )
    }


    static post(userObj){
      return(fetch(endPoint,
        {method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },//end headers
        body: JSON.stringify({
          name: userObj})
        }//end options

        ) //end fetch
      )
    }



  } //end adapter class
