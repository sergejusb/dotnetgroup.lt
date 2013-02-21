module.exports = function(req, res) {
  var events = require('../models/events.js');

  var rss = require("rss");
  var feed = new rss(
  {
    title: "Lietuvos .net naudotojų grupės susitikimai",
    description: "Programuotojų, testuotojų, architektų ir kitų entuziastų grupė, dirbanti su .net technologijomis",
    feed_url: "http://dotnetgroup.lt/rss.xml",
    site_url: "http://dotnetgroup.lt",
    image_url: "http://dotnetgroup.lt/public/img/logo.png",
    author: "Lietuvos .net naudotojų grupė"
  });

  events.futureEvents.concat(events.pastEvents).forEach(function(ev) {
    var description = "";
    ev.presenters.forEach(function(p) {
      description += "<p>" + p.name + " - " + p.presentation.title + "</p>";
    });

    feed.item({
      title:  ev.name,
      description: description,
      url: "http://dotnetgroup.lt/#" + ev.no,
      date: ev.date
    });
  });

  res.charset = "utf-8";
  res.type("application/xml");
  res.send(feed.xml());
}