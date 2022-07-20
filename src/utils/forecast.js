const request=require("postman-request")
const foreCast=(latitude, longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=a54e4e11d7a5c79d9145ce6dc6655975&query="+latitude+","+longitude+"&units=f"
    request({url, json:true}, (error,{body})=>{
     if(error){
         callback('Unable to connect to location!')
     }
     else if(body.error)
     {
         callback('Unable to find location. Try again with another search')
     }
     else{
       callback(undefined, "current temperature is "+body.current.temperature)
     }
 
    })
 }

 module.exports=foreCast