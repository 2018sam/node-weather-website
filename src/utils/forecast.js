const postman_request = require('postman-request');

const forecast = (latitude,longitude,callback) => {
    const uri = "http://api.weatherstack.com/current?access_key=183531605d6f30582fa4cd62ced9756e&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"&units=f";
    
    postman_request({uri:uri,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect weather api",undefined)
        }else if(body.error){
            callback(body.error.info,undefined)
        }else{
            callback(undefined,{
                location: body.location.name,
                temp:body.current.temperature,
                precp: body.current.precip,
                description: body.current.weather_descriptions[0]
            })
        }
    })

}

module.exports = forecast
