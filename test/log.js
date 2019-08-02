const wiston = require('winston');

wiston.con

const logger = wiston.createLogger({
    level: 'info',
    format: wiston.format.simple(),
    transports: [
        new wiston.transports.File({filename: 'error.log', level: 'error'}),
        new wiston.transports.File({filename: 'info.log', level: 'info'})
    ]
})


logger.log('error', 'this is an error msg');
