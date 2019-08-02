const express = require('express'),
  router = express.Router();
const multer = require('multer')
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
// remove key - use role on server

const otpController = require("../controller/otpController"),
  doorController = require("../controller/doorController"),
  authController = require("../controller/authController"),
  adminController = require("../controller/adminController"),
  logController = require('../controller/logController'),
  photoUploadController = require('../controller/photoUploadController');


const s3 = new AWS.S3();
const photoUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'smartlock-photo',
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});


router.get('/', otpController.renderMethod);

//============================session========================
router.route('/login')
  .get((req, res) => res.render('login'))
  .post(authController.userLogin);

router.route('/signup')
  .get(function (req, res) {
    res.render('signup');
  })
  .post(authController.signup);

router.get('/logout', authController.userLogout);
router.post('/changepassword', authController.changepassword);

//============================auth methods===================
router.post('/sms', otpController.sendViaSms);
router.post('/gmail', otpController.sendViaGmail);


//============================submit=========================
router.route('/submit')
  .get((req, res) => {
    res.render('submit', {
      userName: req.user.name,
      usertype: req.user.usertype
    });
  })
  .post(otpController.submitOtp);

router.route('/doorControl')
  .get((req, res) => {
    res.render('door-control', {
      userName: req.user.name,
      usertype: req.user.usertype
    });
  })
  .post(doorController.openDoor)

//============================logs===========================
router.get('/logs', logController.getLogs);
router.get('/logs/content', logController.getLogContent);

//============================account setting================
router.get('/setting', (req, res) => {
  console.log("redirect to setting");
  res.render('setting', {
    userName: req.user.name,
    usertype: req.user.usertype
  });
});
router.route('/upload')
  .post(photoUpload.array("photo"), photoUploadController.uploadPhoto);

//============================admin manager==================
router.route('/manage')
  .get(adminController.manageAccount)
  .post(adminController.actionToAccount);
module.exports = router;

//TODO: validator [controller]
//TODO: display notification using AJAX [controller]

//TODO: restructure
