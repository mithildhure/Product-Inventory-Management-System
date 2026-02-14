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
    secret:"idk_bruh",
    resave:false,
    saveUninitialized:false
}))

app.use("/",uroute);
app.use("/",proute);

app.use((req,resp,next)=>{
    resp.status(404).render("404");
})

app.listen(4000,()=>{
    console.log("Running");
})