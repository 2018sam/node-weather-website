const postman_request = require("postman-request");

const geocode = (address,callback) => {
    const uri2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1Ijoic2FtZWVyYWE0ZXZlciIsImEiOiJja3VyZHlhdDU1NGJ6MnBxNjM2OTI2dmVtIn0.Vt2-I678omXemgQN2NxFvQ";
    postman_request({uri:uri2,json:true},(error,{body})=>{
        if(error){
           callback('Unable to connect to geocoding api',undefined);
        }else if(body.features.length===0){
            callback('Location is not valid',undefined);
        }else{
            callback(undefined,{
                place: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            }
            )
        }
    })
 }

 module.exports = geocode