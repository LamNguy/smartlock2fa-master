const s3service = require('../services/log-management/s3');


exports.getLogs = function (req, res) {

    if (req.user.usertype !== 'admin') {
        return res.redirect('/')
    }

    s3service.getLogList((err, data) => {
        if (err)
            return res.render('logs')
        else
            return res.render('logs', {
                logTitles: data,
                userName: req.user.name,
                usertype: req.user.usertype
            });
    });
}

exports.getLogContent = function (req, res) {
    console.log("hello" + req.query.logId);
    s3service.getLogContent(req.query.logId, (err, data) => {
        return res.json({
            err,
            url: data
        })
    });

    // res.json({data: 'success'});
}
