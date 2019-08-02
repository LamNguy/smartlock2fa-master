const otpConfig = require('../../config/otpAuth');
const randomstring = require('randomstring');


initTimer = function (otp) {
  console.log('init timer');
  otp.createTime = new Date().getTime() / 1000;
}

let isValidOtp = exports.isValidOtp = function (otp) {
  if (otp.createTime === 0) return false;
  return new Date().getTime() / 1000 - otp.createTime <= otpConfig.MAX_AGE;
}

let generateOtpValue = exports.generateOtpValue = function (otp) {
  otp.otpValue = randomstring.generate({
    length: 4,
    charset: 'numeric'
  });
  ;
  console.log('this.generateOtpValue');
}

let createNewOtp = function () {
  var newOtp = {
    otpValue: '0',
    createTime: 0
  };
  generateOtpValue(newOtp);
  initTimer(newOtp);

  return newOtp;
}

exports.getCurrentOtp = function (req) {

  var currentOtp = req.session.otp;


  if ((typeof currentOtp === 'undefined') || !isValidOtp(currentOtp)) {
    currentOtp = createNewOtp();
    req.session.otp = currentOtp;
    req.session.save();
  }

  return currentOtp;

}

//TODO: LEARN JS PROTOTYPE :'((((((
//TODO: Handle time in javascript
