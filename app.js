const express = require('express');
const gracefulExit = require('express-graceful-exit');
const path = require('path');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const dbConfig = require('./app_server/config/database');
const maxAgeConfig = require('./app_server/config/maxAge');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('./app_server/config/aws');

let dbconnection = undefined;
const port = process.env.PORT || 8000;

const authController = require("./app_server/controller/authController");
const mainRoute = require('./app_server/routes/index');

let app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
});
require('./app_server/config/passport')(passport);
dbconnection = mongoose.connection;

app.use(flash());
// app.use(cookieParser());
app.use(
  session({
    saveUninitialized: true,
    secret: 'secret',
    resave: true,
    cookie: {
      // httpOnly: true,
      expires: true,
      secure: false,
      maxAge: maxAgeConfig.session * 1000
    },
    store: new MongoStore({
      mongooseConnection: dbconnection
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(serveStatic(path.join(__dirname, 'public'))); //TODO: maxage

//=========================== Common middlewares =========================

app.use(authController.isLoggedIn);
app.use(authController.isTwoFaPass);
app.use("/", mainRoute);
// app.use("/logs", logsRoute);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(gracefulExit.middleware(app));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port);

console.log("listen on " + port);
module.exports = app;

//TODO: create web portal
//TODO: reorganize config files
