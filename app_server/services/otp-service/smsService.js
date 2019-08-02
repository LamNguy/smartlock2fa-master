// const twilioConfig = require("../../config/twilio");


const https = require('https');
const querystring = require('querystring');

const txtlocalConfig = require('../../config/txtlocal')

//========================= twilio ===========================
// exports.sendOtp = function (userPhoneNumber, otp) {
//     const content = "This is otp code: " + otp;

//     client.messages.create({
//             body: content,
//             from: twilioConfig.outboundNumber,
//             // statusCallback: "http://twofasmartlock.ddns.net:8000/sms/smsstatus",
//             to: userPhoneNumber
//         })
//         .then(message => console.log(message)).done();
//     // cb(undefined);
// }


//======================== textlocal ==========================
exports.sendOtp = function (userPhoneNumber, otp) {

    const apiQuery = querystring.stringify({
        'apikey': txtlocalConfig.apikey,
        'numbers': userPhoneNumber,
        'message': 'Your otp is: ' + otp,
        'sender': txtlocalConfig.sender,
    })

    console.log(apiQuery);

    const path = '/send/?' + apiQuery;

    // Set up the request
    var post_req = https.request({
        hostname: 'api.txtlocal.com',
        path: path
    });

    post_req.end();
    post_req.on('data', (res) => {
        console.log(res);
    })

}


//TODO: remove credentials

//FIXME: handle error
