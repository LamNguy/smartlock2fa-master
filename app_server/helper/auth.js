const moment = require("moment");

const maxAgeConfig = require("../config/maxAge");

exports.isTwoFaPass = function (authenticatedAt) {
  if (typeof authenticatedAt === "undefined") return false;

  const now = moment(new Date());
  const authenticateDuration = moment.duration(now.diff(authenticatedAt)).asSeconds();

  return authenticateDuration <= maxAgeConfig.twoFaAuthenticated;
}
