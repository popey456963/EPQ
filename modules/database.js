var colors = require("colors");
var childProcess = require("child_process");
var mongoose = require("mongoose");
var crypto = require('crypto');

var ObjectId = require('mongoose').Types.ObjectId;

var spacemanSchema = mongoose.Schema({
    spacemanID: Number,
    spacemanData: String,
    averageVote: Number
});

var sessionSchema = mongoose.Schema({
    sessionSocket: String,
    email: String
});

var session = mongoose.model("session", sessionSchema);
var spaceman = mongoose.model("spaceman", spacemanSchema);

module.exports = {
    connectToMongo: function() {
        mongoose.connect('mongodb://localhost:27017');
        var db = mongoose.connection;
        db.on('error', function(callback) {
            console.log("database.js - " + "[Spacey] Error Connecting to MongoDB".red);
        });
        db.once('open', function (callback) {
            console.log("database.js - " + "[Spacey] Connected to MongoDB".green);
        });
    },

    clearSessions: function(callback) {
        session.remove({}, function() { 
        	console.log("database.js - " + "[Spacey] Cleared Sessions".green); 
        });
    },

    addSpaceman: function(spacemanID, spacemanData, averageVote, callback) {
        var thisSpaceman = new user({ spacemanID: spacemanID, spacemanData: spacemanData, averageVote: averageVote });
        user.findOne({ spacemanID: spacemanID }, function(err, users) {
            if (users == undefined) {
                thisSpaceman.save(function(err, self) {
                    if (err) console.log("database.js - " + "[Spacey] ".red + err.red);
                    callback(true);
                });
            } else {
                callback("existingID");
            }
        });
    }
}