const express=require("express")
const path=require('path')
const app=express()
const hbs= require('hbs')
const geoCode=require('./utils/geocode')
const foreCast = require("./utils/forecast")
const port=process.env.PORT||3000
// to acccess all inside public s=directry
// public
const publicDir=path.join(__dirname,'../public')
app.use(express.static(publicDir))

// view
const viewPath=path.join(__dirname,'../templates/views')
// to set handle bars and calling hbs file
app.set('view engine','hbs')   //rqeq i hbs is used
app.set('views', viewPath)


// partials
const partialPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'home',
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About'
    })
})
app.get('/other',(req,res)=>{
    res.render('other',{
        title:'other'
    })
})





// calling 404 page, it always at last hence * is a wild card character 
// it first searches in all paths mentioned abve and at last shows 404 page



app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"Pls provide address"
        })
    }
    // else
    geoCode(req.query.address, (error,{latitude, longitude}={})=>{
        if(error){
            return res.send({error})
        }
        foreCast(latitude, longitude, (error,forecastdata)=>{
            if(error)
            {
                return res.send({error});
            }
            res.send({
                forecast:forecastdata,
                address:req.query.address
            })
        })
    })
})


app.get('*', (req,res)=>{
    // res.send("My 404 page")
    res.render('404',{
        title:'404 appear as title',
        name:'vaihav is responible',
        errorMessage:'Error message is 404 not found'
    })
})
app.listen(port,()=>{
    console.log("server is up on port "+port)
})
