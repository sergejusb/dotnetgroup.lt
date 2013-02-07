var events = require("./events.json");
var moment = require("moment");

var pastEvents = [];
var futureEvents = [];

var now = moment();
events.forEach(function(globalEvent) {
  globalEvent.events.forEach(function(localEvent) {
  	var date = moment(localEvent.date);
  	localEvent.presenters = globalEvent.presenters;
  	localEvent.code = localEvent.no + localEvent.location.city.toLowerCase()[0];
  	localEvent.date = date.format("YYYY-MM-DD HH:mm");
  	localEvent.dateShort = date.format("YYYY-MM-DD");
  	if (!localEvent.registration) {
  	  localEvent.registration = "http://ltnet" + localEvent.code + ".eventbrite.com";
  	}

  	if (date >= now) {
  	  futureEvents.push(localEvent);
  	} else {
  	  pastEvents.push(localEvent);
  	}
  });

});

module.exports = {
  "futureEvents" : futureEvents,
  "pastEvents" : pastEvents
};