var http = require('http');
var express = require('express');
var app = express();
var routes = require('./routes');

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
  app.use("/public", express.static(__dirname + "/public", {maxAge: 86400000}));
});

app.locals.title = "Lietuvos .net naudotojų grupė";

app.get("/", routes.home);
app.get("/rss.xml", routes.rss);
app.get("/stream", routes.stream);
app.get("/debug", routes.debug(app));

http.createServer(app).listen(app.get("port"));