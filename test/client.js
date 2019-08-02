const Pusher = require('pusher');

const key = '0d0c62eb66a2a18bce0c'
const secret = '5c2b481b3e10cf9b9919'
const appId = '603727'

const pusher = new Pusher({
    appId,
    secret,
    key,
    encrypted: true,
    cluster: 'mt1'
})

pusher.trigger('smartlock', 'myevent', {
    "message": "hello world"
});
