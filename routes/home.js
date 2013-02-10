module.exports = function(req, res) {
  var events = require('../models/events.js');
  res.render("home", { "events" : events });
};