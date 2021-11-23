console.log('client side javascript is loaded')

fetch("http://localhost:3000/weather?address=sacramento").then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location);
            console.log(data.weather);
        }
    })
})

const weatherForm = document.querySelector('form');
const address = document.querySelector("#address");

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('Submitted');
    console.log(address.value)
    document.querySelector("#error").textContent = "Loading...";
    if(!address.value){
        console.log("Pls provide valid address")
    }else{
        fetch("http://localhost:3000/weather?address="+address.value).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    document.querySelector("#error").textContent = data.error;
                    document.querySelector("#location").textContent = "";
                    document.querySelector('#weather').textContent = "";
                }else{
                    document.querySelector("#error").textContent = "";
                    document.querySelector("#location").textContent = data.location
                    document.querySelector('#weather').textContent = data.weather.temp+"F";
               }
            })
        })
    }
    
})