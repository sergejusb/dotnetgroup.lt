var http = require('http');
var express = require('express');
var app = express();
var model = {
  "events": require('./models/events.js')
};

app.configure("development", function() {
  //app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function() {
  app.use(express.errorHandler());
});

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.favicon(__dirname + "/favicon.ico"));
  app.use(express.compress());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.staticCache());
  app.use("/public", express.static(__dirname + "/public", {maxAge: 86400000}));
});

app.locals.title = "Lietuvos .net naudotojų grupė";

app.get("/", function(req, res) {
  res.render("index", { "events" : model.events });
});

app.get("/stream", function(req, res) {
  res.redirect("//stream.dotnetgroup.lt");
});

app.get("/debug", function(req, res) {
  var info = {
    "env" : app.get("env"),
    "model" : model
  };
  res.send(info);
});

http.createServer(app).listen(app.get("port"));