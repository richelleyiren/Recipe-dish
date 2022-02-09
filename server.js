const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer')
 require('dotenv').config()
// const path = require('path')
const port = process.env.PORT||5000
const app =  express()
const recipeRout = require('./routes/recipeRoute')



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(recipeRout)

const secret = process.env.secret



mongoose.connect(secret, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(results =>{
    if(results){
        console.log('connection done')
    }
}).catch(err =>{
    console.log(err)
})

app.set("view engine","ejs")
app.use(express.static("public"));


//image upload


app.get('/', (req,res)=>{
    res.redirect("/home")
})



app.get('/about', (req,res)=>{
    res.render("about")
})

app.get('/display',(req,res)=>{
    res.render("display")
})

app.get('/home', (req,res)=>{
    res.render('main')
})

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get('/recipe',(req,res)=>{
    res.render('recipe')
})



app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})