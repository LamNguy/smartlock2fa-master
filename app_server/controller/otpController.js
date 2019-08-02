const moment = require("moment");

const otpHandler = require("../services/otp-service/otpHandler");

const mailservice = require('../services/otp-service/mailservice'),
smsService = require('../services/otp-service/smsService');

exports.renderMethod = function(req, res) {
  let userName = req.user.name;
  let isActive;
  if (req.user.usertype == 'admin') {
    isActive = 'true';
  } else if (req.user.active === false) {
    isActive = 'false';
  } else {
    isActive = 'true';
  }
  res.render('index', {
      userName: userName,
      isActive: isActive,
      usertype: req.user.usertype
  });
}

exports.sendViaSms = function (req, res) {
  let currentOtp = otpHandler.getCurrentOtp(req);
  // console.log(req.user + '\n' + req.user.email + " " + req.user.phone);
  console.log('Prepare to send otp code via sms ' + currentOtp.otpValue);
  smsService.sendOtp(req.user.phone, currentOtp.otpValue);
  console.log('Otp sent via sms');

  res.send("Otp sent via sms");
}


exports.sendViaGmail = function (req, res) {
  let currentOtp = otpHandler.getCurrentOtp(req);
  console.log(req.user.email + ", " + req.user.name);
  console.log('Prepare to send otp code via gmail ' + currentOtp.otpValue);

  mailservice.sendOtp(req.user.email, currentOtp.otpValue, (err) => {
    if (err) {
      console.log(err);
      res.render('error', {
        message: err
      });
    } else {
      console.log('OTP sent via gmail');
      res.send("redirecting...");
      // res.redirect("/submit");
      // res.send("OTP sent via gmail");
    }
  });

  // test post req
  // res.json({
  //   submitBtnEn: true
  // });
}


exports.submitOtp = function (req, res) {
  var currentOtp = otpHandler.getCurrentOtp(req);
  var respondMessage = "Invalid Otp";
  var success = false;
  console.log(req.body.otpInput + ' ' + currentOtp.otpValue);

  if (req.body.otpInput === currentOtp.otpValue) {
    console.log('2fa Authenticated');
    respondMessage = "Redirecting to door control interface";
    success = true;
    req.session.authenticatedAt = moment(new Date());
    req.session.save();
  }

  res.send({
    message:respondMessage,
    success:success
  });
}
