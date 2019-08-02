const moment = require('moment');

console.log(moment());

const prev = moment("2018-02-09","YYYY-DD-MM");
const now = moment(new Date());


console.log(moment.duration(now.diff(prev)).asHours());
