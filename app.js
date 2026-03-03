require('dotenv').config();
const express = require('express');
const uroute = require('./router/urouter');
const proute = require('./router/prouter');
const { connectDb } = require('./db');
const session = require('express-session');
const methodOveride = require('method-override');

connectDb();
const app = express();

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOveride("_method"));

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))


app.get("/ping",(req,resp)=>{
    resp.status(200).send("Server Is Awake!");
})

app.use("/",uroute);
app.use("/",proute);


app.use((req,resp,next)=>{
    resp.status(404).render("404");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Running on port : ${PORT}`);
})