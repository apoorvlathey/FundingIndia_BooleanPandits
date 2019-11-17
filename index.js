const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mailer = require('./nodemailer');
const body = require('body-parser');
const maticTransfer = require('./transfer-ERC20');
const maticBalance  = require('./balance-of-ERC20');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(body.json());
app.use(body.urlencoded());


app.use(express.static('public'));
mongoose.connect('mongodb+srv://rachit2501:hacktiet@cluster0-djeid.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
    .then(()=>console.log("Connected to databse"))
    .catch(()=>console.log("Failed to connect to database"));

const Schema = mongoose.Schema({
    AadharNumber : String , 
    email : String
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
        AadharNumber : req.body.adhaar,
        email : req.body.email
    };
    const newUser = new model(user);
    newUser.save();
    res.redirect('/verify');
});

app.get('/verify' , (req , res)=>{
    res.sendfile(__dirname + '/verify.html');
});

app.post('/verify' , async (req , res)=>{
    const data = await model.findOne({AadharNumber : req.body.adhaar});
  //  const validPassword = bcrypt.compare(req.body.AadharNumber , )
console.log(data);
console.log(req.body);
  if(data)
  {
      console.log("sadsad");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash("dsofhdasofhjk" , salt);
      const userdetails = new passModel({AadharNumber:req.body.AadharNumber, password:hash});
      mailer(req.body.email , hash);
      res.send("Use the link send to you email address to procees furthur");
      userdetails.save();
  }
  else
  res.send('Wrong Input Try Again');
});


app.get('/redirecting/:id*' , async (req , res) =>{
    console.log(req.params.id);
    const user = passModel.findOne({password:req.params.id});
    if(user)
    res.redirect('/paymentGateway');
});

app.get('/paymentGateway' , (req,res)=>{
    res.sendFile(__dirname + '/payment.html');
})
app.get('/' , (req , res)=>{
    res.sendFile(__dirname + '/index1.html');
})

app.get('/form' , (req , res)=>{
    res.sendFile(__dirname + '/form.html');
});
app.get('/about' , (req , res)=>{
    res.sendFile(__dirname + '/about.html');
});

app.get('/mail' , (req , res)=>{
    res.sendFile(__dirname + '/mail.html');
});

app.get('/bal/:id' , async (req ,res)=>{
    const balance = await maticBalance(req.params.id);
    res.send(balance);
});

app.post('/blockchainTransfer' , (req , res)=>{
    const name = req.body.name;
    var add = ""
    if(name === "bjp")
        add = "0xA09aB1aBeCb91CaC38c3240912D2A1b31e22F147"
    else if(name === "con")
        add = "0x038bCb5eDF4e069BfF32CFCd016ACB4B6d0ccC43"
    else if(name === "sam")        
        add = "0x36dCeE2b84b1E19516025c5384A7c4225AcB5Ce7"
    else if(name === "aap")
        add = "0xA7587b401860b95e0135a3d15b6fc76b9C8E4157"
    if(add)
    maticTransfer( add, req.body.amount);
});

app.post('/blockchainBalance' , async (req , res)=>{
    console.log(req.body);
    const balance = await maticBalance(req.body.address);
    console.log(balance);
    res.send(balance);
});

app.get('/congress' , (req , res)=>{
    res.sendFile(__dirname + '/CONGRESS.html')
})

app.get('/aap' , (req , res)=>{
    res.sendFile(__dirname + '/AAP.html')
})
app.get('/sp' , (req , res)=>{
    res.sendFile(__dirname + '/SP.html')
})
app.get('/bjp' , (req , res)=>{
    res.sendFile(__dirname + '/BJP.html')
})


const port = process.env.PORT || 5003;
app.listen(port , ()=>console.log("server up"));