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

io.sockets.on('connection', function(socket){
  	var clientIp = socket.request.connection.remoteAddress;
  	console.log("app.js      - " + "[Spacey] ".green + "A User Connected From ".blue + clientIp);


  	database.returnRandomSpaceman( function(data) {
		socket.emit('map', JSON.stringify(data));
	});

  	socket.on('disconnect', function(){
    	console.log("app.js      - " + "[Spacey] ".green + "A User Disconnected".blue);
  	});
});

//database.clearSpaceman(function(){});
database.getSpacemen(function(data){console.log(data);console.log("Listed Spacemen");});
// database.getNumberOfSpacemen(function(data){console.log(data);console.log("Listed Number of Spacemen");});
bitmap.makeBaseGenerations(database);
//database.manipulateEntry("id", "change", bitmap);


http.listen(3000, function() {
    console.log("app.js      - " + "[Spacey] Running at ".green + "http://localhost:3000".blue);
    setTimeout(function() {
        database.connectToMongo();
    }, 1000);
});