const AWS = require('aws-sdk');
// remove key - use role on server
const s3 = new AWS.S3();

exports.getLogList = function (cb) {
    const params = {
        Bucket: 'smartlock-log'
    };
    s3.listObjects(params, (err, data) => {
        console.log(data.Contents);
        logs = data.Contents.map(log => log.Key);
        // console.log('logs: '+ logs[0]);
        cb(err, logs);
        //TODO: getobj
    })
}

exports.getLogContent = function (logId, cb) {
    const params = {
        Bucket: 'smartlock-log',
        Key: logId,
        Expires: 60
    };
    s3.getSignedUrl('getObject', params, (err, data) => {
        console.log(data);
        cb(err, data)

    })
}


//TODO: exports
