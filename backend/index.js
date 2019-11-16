const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mailer = reqruire('./nodemailer');

mongoose.connect('mongodb+srv://rachit2501:narutorock123@cluster0-djeid.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
    .then(()=>console.log("Connected to databse"))
    .catch(()=>console.log("Failed to connect to database"));

const Schema = mongoose.Schema({
    AadharNumber : Number , 
    PhoneNumber : Number
});

const model = mongoose.model('UserInfo' , Schema);

app.post('/register' , async (req , res)=>{
    // const salt = await bcrypt.genSalt(10);
    // const AadharNumber = await bcrypt.hash(req.body.AadharNumber , salt);
    const user = {
        AadharNumber : req.body.AadharNumber,
        PhoneNumber : req.body.PhoneNumber
    };
    const newUser = new model(user);
    newUser.save();
    res.send("registered");
});

app.post('/verify' , async (req , res)=>{
    const data = model.findOne({AadharNumber : req.body.AadharNumber});
  //  const validPassword = bcrypt.compare(req.body.AadharNumber , )

  if(data)
  {
      mailer(req.body.email , req.body.password);
  }
})
