const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mailer = require('./nodemailer');
const body = require('body-parser');

app.use(body.json());
app.use(body.urlencoded());

mongoose.connect('mongodb+srv://rachit2501:hacktiet@cluster0-djeid.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
    .then(()=>console.log("Connected to databse"))
    .catch(()=>console.log("Failed to connect to database"));

const Schema = mongoose.Schema({
    AadharNumber : Number , 
    PhoneNumber : Number
});

const Schema2 = mongoose.Schema({
    password : String , 
    AadharNumber : Number
})

const model = mongoose.model('UserInfo' , Schema);
const passModel = mongoose.model('passes' , Schema2);

app.post('/register' , async (req , res)=>{
    // const salt = await bcrypt.genSalt(10);
    // const AadharNumber = await bcrypt.hash(req.body.AadharNumber , salt);
    console.log(req.body);
    const user = {
        AadharNumber : req.body.AadharNumber,
        PhoneNumber : req.body.PhoneNumber
    };
    const newUser = new model(user);
    newUser.save();
    res.send("registered");
});

app.post('/verify' , async (req , res)=>{
    const data = model.findOne({AadharNumber : req.body.AadharNumber ,  });
  //  const validPassword = bcrypt.compare(req.body.AadharNumber , )

  if(data)
  {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("dsofhdasofhjk" , salt);
      const userdetails = new passModel({AadharNumber:req.body.AadharNumber, password:hash});
      mailer(req.body.email , hash);
      res.send("emailSend");
      userdetails.save();
  }
})

app.get('/redirecting/:id*' , async (req , res) =>{
    console.log(req.params.id);
    const user = passModel.findOne({password:req.params.id});
    if(user)
    res.send("dsjlkfdsk");
})
const port = process.env.PORT || 5001;
app.listen(port , ()=>console.log("server up"));