const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./user')

// mongoose.connect("mongodb://smartlock:phong4898@ds111082.mlab.com:11082/accountdb");

var db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
})
db.on('connect', () => {
  console.log("connect");
})

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
  return {
    salt: salt,
    password: hashedPassword
  };
};

exports.create = function (username, name, password, email, phone, usertype, cb) {

  var salt = genRandomString(10);
  var auth = sha512(password, salt);

  var newUser = new User({
    username: username,
    name: name,
    auth: auth,
    email: email,
    phone: phone,
    usertype: usertype
  });

  newUser.save((err) => {
    if (err) {
      console.log("error");
      return cb(err);
    }
    return cb(null);
  });
}

exports.delete = function (username) {
  User.findOneAndRemove({
    username: username
  }, (err, user) => {
    if (!err) {
      if (!user)
        console.log("cannot find user")
      else
        console.log("Remove user: " + user);
    } else {
      console.log(err);
    }
  });
}

exports.getListUsers = function (cb) {
  User.find({})
    .exec(function (err, users) {
      if (err) {
        console.log("Users not found.");
      } else {
        console.log("found");
      }
      cb(users);
    });

}

exports.activateUser = function (username) {
  User.updateOne({
    username: username
  }, {
      active: true
    }, (err, user) => {
      if (err) {
        console.log("can not found user");
      } else {
        console.log(user);
      }
    });
}

exports.deactivateUser = function (username) {
  User.updateOne({
    username: username
  }, {
      active: false
    }, (err, user) => {
      if (err) {
        console.log("can not found user");
      } else {
        console.log(user);
      }
    });
}

exports.changepwd = function (username, oldpwd, newpwd) {

}


// require('make-runnable');
