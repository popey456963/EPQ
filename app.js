var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var git = require('git-rev');
var prettyjson = require('prettyjson');

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

http.listen(3000, function() {
    console.log("app.js      - " + "[Spacey] Running at ".green + "http://localhost:3000".blue);
    database.clearSessions();
    setTimeout(function() {
        database.connectToMongo();
    }, 1000);
});