
const sgMail = require('@sendgrid/mail');
const sgConf = require('../../config/sendgrid');

sgMail.setApiKey(sgConf.apiKey);


exports.sendOtp = function (userEmail, otp, cb) {

  const sender = "admin@" + sgConf.domain;
  const msg = {
    to: userEmail,
    from: "phong@"+sgConf.domain,
    subject: 'Otp coming... open it softly',
    text: "Your otp is: " + otp,
  };

  sgMail.send(msg, (err, info) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      console.log(info);
      console.log("Otp sent: " + otp);
      console.log('(Re)activate OTP');
      cb(undefined);
    }
  });

};

//TODO: put in config file
//TODO: notif user when userEmail send done
//TODO: var -> let
