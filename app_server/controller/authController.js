const passport = require("passport");
const moment = require("moment");
const _ = require("underscore");

const authHelper = require("../helper/auth");
const mongoParseHelper = require("../helper/mongoErrorParse");
const db = require('../models/db');

exports.userLogin = function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.render('login', {
                message: info.message,        
            });
        }


        req.session.authenticatedAt = null;
        req.session.save();

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}



//TODO: move to middleware dir
exports.isLoggedIn = function (req, res, next) {
    // console.log('SESSION ' + JSON.stringify(req.session.passport.user));
    const exceptPaths = ['/login', '/signup'];
    console.log(req.path);
    console.log(_.contains(exceptPaths, req.path));
    if (_.contains(exceptPaths, req.path))
        return next();


    if (req.isAuthenticated()) {
        // console.log('success');
        return next();
    }

    console.log('fail');
    return res.redirect('/login');
}


exports.isTwoFaPass = function (req, res, next) {

    console.log('running twofapath middleware')

    const exceptPaths = [{
        path: "/logs",
        method: "GET"
    }, {
        path: "/signup",
        method: "GET"
    }];

    for (let i = 0; i < exceptPaths.length; i++) {
        console.log('path ' + req.path);

        if (req.path.includes(exceptPaths[i].path) && req.method === exceptPaths[i].method) {
            console.log("run");

            return next();
        }
    }

    if (authHelper.isTwoFaPass(req.session.authenticatedAt)) {
        return res.render('door-control');
    } else {
        return next();
    }
}


exports.userLogout = function (req, res) {
    req.logOut();
    req.session.destroy(err => {
        res.clearCookie();
        res.redirect('/');
    });
}


exports.signup = function (req, res, next) {
    console.log(req.body);
    db.create(req.body.username,
        req.body.name,
        req.body.password,
        req.body.email,
        req.body.phone,
        "member",
        (err) => {
            if (err) {
                console.log(err);
                message = mongoParseHelper.parse(err);
                
                return res.render("signup", {
                    message: message
                });
            }
            return res.redirect("/login");
        }
    );
}

exports.changepassword = function(req, res, next) {
    
}




//TODO: handle error
