const appRoot = require('app-root-path');
const winston = require('winston');
require('winston-daily-rotate-file');


const errorPath = appRoot.path + '/app_server/logs/smartlock.err';
const outPath = appRoot.path + '/app_server/logs/smartlock.out'

console.log(outPath);

const logger =  winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({filename: errorPath+'-%DATE%.log', level: 'error', colorize: true,
    datePattern: 'YYYY-MM-DD-HH',
    // zippedArchive: true,
    maxSize: '5m',
    maxFiles: '14d' }),
    new winston.transports.DailyRotateFile({filename: outPath+'-%DATE%.log', level: 'debug', colorize: true,
    datePattern: 'YYYY-MM-DD-HH',
    // zippedArchive: true,
    maxSize: '5m',
    maxFiles: '14d'})
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),

});

module.exports = logger;
