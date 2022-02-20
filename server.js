const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer')
const User = require('./models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { handleErrors, generateToken } = require("./helpers/userhelpers");
 require('dotenv').config()
// const path = require('path')


const port = process.env.PORT||5000
const app =  express()
const recipeRout = require('./routes/recipeRoute')



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

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




//image upload


app.get('/', (req,res)=>{
    res.redirect("/home")
})



app.get('/about', (req,res)=>{
    res.render("about")
})

//sign-up
 console.log(User)
app.post('/signup', async (req, res) => {
    const { email ,password } = req.body 
    try {
      const newUser = new User({
        email,
        password,
      });
     
      const userNew = await newUser.create()
       res.json(userNew)
      console.log(userNew)

        const token = generateToken(userNew._id);
        console.log(token)

        res.cookie('jwt', token , { maxAge: 3 * 24 * 60 * 60 *1000, httpOnly: true });
        res.status(201).json({ userNew: userNew._id });
        console.log(userNew)
      
    } catch (error) {
      

      const errors = handleErrors(error);

      res.json({ errors });

     
    }
        
 
});

// app.get('/users',(req,res)=>{
//     res.send("mango")
// })
 
app.get('/login', async(req,res)=>{
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (user) {
      
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        
        const token = generateToken(user._id);
        
        res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 60, httpOnly: true });

        res.status(200).json({ user: user._id });
      } else {
        res.json({ errors: "Incorrect password" });
        
      }
    } else {
      
      res.json({ errors: "Email does not exist please signup" });
    }
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.json({ errors });
  }

})
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});




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