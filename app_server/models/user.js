const mongoose = require('mongoose');
const crypto = require('crypto');
const emailValidator = require('validator/lib/isEmail');

// mongoose.connect('mongodb://localhost:27017/accountdb');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    maxlength: 30,
    minlength: 5,
    lowercase: true,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    maxlength: 30,
    minlength: 5,
    required: true
  },
  auth: {
    salt: String,
    password: {
      type: String
    }
  },
  usertype: {
    type: String,
    enum: ['admin', 'member'], //TODO:
    require: true
  },
  email: {
    type: String,
    maxlength: 30,
    minlength: 5,
    lowercase: true,
    trim: true,
    unique: true,
    validate: [emailValidator, 'invalid email']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return v.indexOf("+84") === 0 && v.length <= 13 && v.length >= 12;
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    unique: true
  },
  active: {
    type: Boolean,
    require: true,
    default: false
  }
});

userSchema.methods.validatePassword = function (password) {
  return sha512(password, this.auth.salt) === this.auth.password;
};

var User = mongoose.model('accounts', userSchema);

var genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var hashedPassword = hash.digest('hex');
  // return {
  //   salt: salt,
  //   password: hashedPassword
  // };
  return hashedPassword;
};
module.exports = User;

//TODO: const
//TODO: rang buoc
//TODO: add validator
