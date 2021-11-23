const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        location:'',
        name:"Sameeraa4ever"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Sameeraa4ever"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        helpText:"First Help 1",
        name:"Sameeraa4ever"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            title: "Error",
            errorMsg: "Address not found"
        })
    }else{
        geocode(req.query.address,(error,{place,longitude,latitude}={})=>{
            if(error){
                res.send({error})
            }else{
                forecast(latitude,longitude,(error,{location,temp,precp,desciption}={})=>{
                    if(error){
                        res.send({error})
                    }else{
                        res.send({
                            location:req.query.address,
                            weather:{
                                location:location,
                                temp:temp,
                                precp:precp,
                                desciption:desciption
                            }
                        })
                    }
                })
            }
        })
        
    }
    
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
                title:"Product Not Found",
                errorMsg:"Search keyword not matched with products",
                name:"Sameeraa4ever"
        })
    }else{
        res.send({
            products:[]
        })
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Help",
        errorMsg:"Help article not found",
        name:"Sameeraa4ever"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404 Page not found",
        name:"Sameeraa4ever",
        errorMsg:"Page Not found"
    })
})

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

