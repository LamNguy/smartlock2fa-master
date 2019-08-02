const socketClientAPI = require("../services/pi-controller/socketClientAPI");
const logger = require('../config/logger');
const pusher = require('../config/pusher');

exports.openDoor = function (req, res, next) {
  var success = false;
  var responseMessage = "Something went wrong!";

  logger.log('debug', req.user.name);

  // socketClientAPI.triggerUnlockSignal(req.user.name);
  // console.log("Trigger done");
  // const event = {
  //   channel: 'smartlock-development',
  //   name: 'open-door',
  //   data: {
  //     user: req.user.name,
  //     message: 'Open door'
  //   }
  // }
  //
  pusher.trigger('smartlock', 'myevent', {
    message: "Open door",
    userName: req.user.name,
    usertype: req.user.usertype
  });

  success = true;
  responseMessage = "Door will unlock in a few seconds";
  res.send({
    success: success,
    message: responseMessage
  });
}
