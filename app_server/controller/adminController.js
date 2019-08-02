const db = require('../models/db');

exports.manageAccount = function(req, res) {
    if (req.user.usertype !== 'admin') {
        return res.redirect('/')
    }

    db.getListUsers(function(usersList) {
        return res.render('admin-manager', {
            data: usersList,
            userName: req.user.name,
            usertype: req.user.usertype
        });
    });   
}

exports.actionToAccount = function(req, res) {
    console.log(req.body.name);
    console.log(req.body.type);

    if (req.body.type === "activate") {
        console.log("ACTIVE");
        db.activateUser(req.body.name);
    } else if(req.body.type === "deactivate") {
        db.deactivateUser(req.body.name);
    } else if (req.body.type === "delete") {
        console.log("DECLINE");
        db.delete(req.body.name);
    }
    return res.json({
        name: "done"
    });
}