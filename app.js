var http = require('http');
var express = require('express');
var app = express();
var model = {
  "events": require('./models/events.js')
};

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.favicon(__dirname + "/favicon.ico"));
  app.use(express.compress());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use("/public", express.static(__dirname + "/public"));
});

app.locals.title = "Lietuvos .net naudotojų grupė";

app.get("/", function(req, res) {
  res.render("index", { "events" : model.events });
});

http.createServer(app).listen(app.get('port'));