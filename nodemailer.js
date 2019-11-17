var nodemailer = require('nodemailer');
const link  = "localhost:5001";

function mailer(email , msg){
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
           user: '362a706f3cf1d8',
           pass: 'd1d8aa8d255068'
        }
    });

var mailOptions = {
  from: 'youremail@gmail.com',
  to: email,
  subject: 'Verification Code',
  text: `${link}/redirecting/${msg}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = mailer;