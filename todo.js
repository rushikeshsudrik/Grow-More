const exp = require('constants');
const express=require('express');
const cookieParser=require('cookie-parser');
const req = require('express/lib/request');
const res = require('express/lib/response');
const path=require('path');         
const port=8000;
const db=require('./config/mongoose');
const ToDo=require('./models/Contact');
const { cookie } = require('express/lib/response');


var ToDoList=[
  {
    Description:"",
    Category:"",
    Date: ""
  }
];


const app=express();                  //firing the express server
app.set('view engine','ejs');         //setting view part
app.set('views',path.join(__dirname,'views'));            
app.use(express.urlencoded());  
app.use(cookieParser());

app.get('/',function(req,res)           //get request
{
  console.log(req.cookies);
  res.cookie('user_id',25);
  ToDo.find({},function(err,ToDoList)
  {
    if(err)
    {
      console.log('Error in fetching ToDOList');
      return;
    }
    return res.render('ToDo',{
      title:"ToDo App",
      content:ToDoList
  });

  })

});

app.post('/create',function(req,res)
{
  ToDo.create({
    Description:req.body.Description,
    Category:req.body.Category,
    Date:req.body.Date
  },function(err,ToDo)
  {
    if(err)
    {
      console.log('Error in creating ToDo list');
      return;
    }
    else{
      console.log('New ToDo List',ToDo);
      return res.redirect('back');
    }
  })


});

app.get('/view',function(req,res)
{
  return res.render('ToDo',{
    title:"ToDo App",
    content:ToDoList
});
})


app.get('/delete-list',function(req,res)
{
  let id=req.query.id;


  ToDo.findByIdAndDelete(id,function(err){
    if(err){
      console.log("Error ");
      return;
    }
    return res.redirect('back');
  })

})



app.post('/users',function(req,res)
{
  return res.redirect('Sign');
})

app.get('/Sign',function(req,res)
{
  return res.render('User_Sign_Up',);
});

app.listen(port,function(err)             //server is created on port
{
  if(err)
  {
    console.log(`error in creating the server:${err}`);
  }
  else{
    console.log(`Server is up and running on port: ${port}`);
  }
})