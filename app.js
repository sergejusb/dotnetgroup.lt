var http = require('http');
var express = require('express');
var app = express();

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "jade");
  app.use(express.favicon(__dirname + '/favicon.ico'));
  app.use(express.compress());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.locals.title = "Lietuvos .net naudotojų grupė";

app.get("/", function(req, res) {
  res.render("index");
});

http.createServer(app).listen(app.get('port'));