const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({
  profile: 's3user'
});
AWS.config.credentials = credentials;
