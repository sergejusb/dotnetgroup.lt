var events = require("./events.json");
var moment = require("moment");

var pastEvents = [];
var futureEvents = [];

events.forEach(function(ev) {
  ev.meetup.forEach(function(m) {
  	m.code = m.no + m.location.city.toLowerCase()[0];
  	m.date = moment(m.date).format("YYYY-MM-DD HH:mm");
  	if (!m.registration) {
  		m.registration = "http://ltnet" + m.code + ".eventbrite.com";
  	}
  });
});

module.exports = events;