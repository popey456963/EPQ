var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var color = require("colors");

console.log("app.js      - " + "[Spacey] Loaded initial requirements".green);

var bitmap = require("./modules/bitmap.js");
var database = require("./modules/database.js");

app.use(require("express").static('public'));

app.get("/", function(req, res) {
    console.log("app.js      - " + "[Spacey] A User Requested /".blue);
    fs.readFile("public/index.html", "utf-8", function(err, data) {
        res.send(data);
    });
});

io.on('connection', function(socket){
  console.log("app.js      - " + "[Spacey] ".green + "A User Connected".blue);
  map = bitmap.getGenerateMap();
  socket.emit('map', JSON.stringify(map));

  socket.on('chat message', function(msg){
    socket.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log("app.js      - " + "[Spacey] ".green + "A User Disconnected".blue);
  });
});

http.listen(3000, function() {
    console.log("app.js      - " + "[Spacey] Running at ".green + "http://localhost:3000".blue);
    database.clearSessions();
    setTimeout(function() {
        database.connectToMongo();
    }, 1000);
});