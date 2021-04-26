const express = require('express');
const app = express();  //In app we store all the methods and properties of express.
const path = require('path');
const hbs = require('hbs');
const Register = require("./models/userRegister");

require('./db/connection.js');  //Connecting with th DB.
const port = process.env.PORT || 3000;  // Site gets host or listen at the port number.

const staticPath = path.join(__dirname, '../public');   //Path for our static files
const viewsPath = path.join(__dirname, '../templates/views');   //Path for our views
const partialsPath = path.join(__dirname, '../templates/partials'); //Path for our partials


app.use(express.json());
app.use(express.urlencoded({extended:false}));  //To get our form data
app.use(express.static(staticPath)); // For using Static files that we create.
app.set("view engine", "hbs");    //Loads View Engine
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); // For loading up our partials.

app.get("/", (req, res) =>{
    res.render('index');
});  //GET Requests to the path which is being specified with the specified callback functions


app.get("/register", (req,res)=>{
    res.render("register");
})

app.get("/login", (req,res)=>{
    res.render("login");
})

//Create new user in DB
app.post("/register", async(req,res)=>{
    try {
        
        const password = req.body.password;
        const cnfpassword = req.body.confirmpassword;

        if(cnfpassword === password){
            const userRegistered = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
            confirmpassword : req.body.confirmpassword,
            });
            

            const registered = await userRegistered.save();
            res.status(201).render("index");
        }
        else{
            res.send("<script>alert('Password and Confirm Password is not matching')</script>");
        }


    } catch (e) {
        console.log(e);
    }
})

app.post("/login", async(req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        if(useremail.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("<script>alert('Either email or password typed is wrong')</script>");
        }
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(port, ()=>{
    console.log(`Server running at port number ${port}`);
});