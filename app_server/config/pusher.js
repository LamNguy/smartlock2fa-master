const Pusher = require('pusher');


const pusher = new Pusher({
  appId: '603727',
  key: '0d0c62eb66a2a18bce0c',
  secret: '5c2b481b3e10cf9b9919',
  encrypted: true , // optional, defaults to false
  cluster: 'mt1', // if `host` is present, it will override the `cluster` option.
  timeout: '10000'    // set timeout to 10 seconds
});

module.exports = pusher;
