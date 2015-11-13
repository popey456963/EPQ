var colors = require("colors");
var childProcess = require("child_process");
var mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');

var spacemanSchema = mongoose.Schema({
    spacemanData: String,
    averageVote: Number,
    peopleVote: Number
});

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

    addSpaceman: function(spacemanData, averageVote, peopleVote, callback) {
        var thisSpaceman = new spaceman({ spacemanData: spacemanData, averageVote: averageVote, peopleVote: peopleVote });
        spaceman.findOne({ spacemanData: spacemanData }, function(err, users) {
            if (users == undefined) {
                thisSpaceman.save(function(err, self) {
                    if (err) console.log("database.js - " + "[Spacey] ".red + err.red);
                    callback(true);
                });
            } else {
                callback("existingData");
            }
        });
    },

    getSpacemen: function(callback){
        spaceman.find({},function(err, spacemen){
            if (err) console.log("database.js - " + "[Spacey] ".red + err.red);
            callback(spacemen);
        });
    },

    getNumberOfSpacemen: function(callback) {
        spaceman.count({}, function( err, count){
            callback(count);
        });
    },

    returnRandomSpaceman: function(callback) {
        module.exports.getNumberOfSpacemen(function(count) {
            var randomNumber = Math.floor((Math.random() * count));
            spaceman.find({}, function(err, spacemen){
                if (err) console.log("database.js - " + "[Spacey] ".red + err.red);
                callback(spacemen[randomNumber]);
            })
        });
    },

    clearSpaceman: function(callback) {
        spaceman.remove({}, function(data){
            console.log("Cleared All Data: " + data);
            callback(data);
        })
    },

    manipulateEntry: function(id, chance, bitmap) {
        spaceman.findOne({_id: id}, function(data){
            console.log(data);
        });
    }
}