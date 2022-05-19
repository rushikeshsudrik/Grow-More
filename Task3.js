const express=require('express');
const cookieParser=require('cookie-parser');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path=require('path');
const db=require('./config/mongoose');
const Registered=require('./models/reg');
const port=8000; 
const app=express();
app.set('view engine','ejs');         
app.set('views',path.join(__dirname,'views')); 
app.use(express.urlencoded());  
app.use(express.static('css'));
app.use(cookieParser());



var Register=[
    {
        Name:" ",
        Email:" ",
        Gender:" ",
        Website:" ",
        Skills:" "
       
    }
];



app.get('/',function(req,res){

    Registered.find({},function(err,Registered){
        if(err){
            console.log("Error in fetching contacts",err);
            return;
        }
        return res.render('Task3',{
            title:"Registration Form",
            head:"Enrolled Students",
            content:Registered
    })


    
    })
})