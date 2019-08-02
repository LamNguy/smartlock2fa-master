const https = require('https');
const querystring = require('querystring');


const apiQuery = querystring.stringify({
    'apikey':'wDmfppaHKMI-g1Omz4BdoyYbfjoCECAMabFWeYcRfV',
    'numbers': '841685179777',
    'message': 'hello world',
    'sender': 'Vu Quoc Phong',
})

console.log(apiQuery);

const path = '/send/?' + apiQuery;

// Set up the request
var post_req = https.request({hostname:'api.txtlocal.com',path: path});

post_req.end();
post_req.on('data', (res) => {
    console.log(res);
})


