module.exports = function(app) {
  return function(req, res) {
    var info = {
      "env" : app.get("env"),
      "events" : require('../models/events.js')
    };
    res.send(info);
  };
};