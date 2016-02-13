var express = require("express");
var dbCommands = require("./../db-commands");
var router = express.Router();
var assert = require('assert');
var urlEncodeParser = require("./../my-body-parser");
var database = null;

router.route("/")
    .get(function(req, res){
        dbCommands.findUser(database, function(users){
            assert.notEqual(users, null, "users are null.");
            res.json(users);
            res.end();
        });
    })
;

router.route("/:user")
    .get(function(req, res){
        dbCommands.getUserReminders(database, req.params.user, function(reminders){
            assert.notEqual(reminders, null, "Empty remiders");
            res.json(reminders);
            res.end();
        });
    })
    .post(urlEncodeParser, function(req, res){
        console.dir(req.body);
        console.log(req.params.user);
        dbCommands.createUserReminder(database, req.params.user, req.body.reminder, function(result){
            res.status(201).json(req.params.user);
            res.end();
        });
    })
    .put(urlEncodeParser, function(req, res){
        dbCommands.updateUserReminder(database, req.params.user, req.body.remindNum, req.body.reminder, function(result){
            res.status(200).json(req.params.user);
            res.end();
        });
    })
    .delete(urlEncodeParser, function(req, res){
        
        console.log("delete number" + req.body.remindNum); 
        dbCommands.deleteUserReminder(database, req.params.user, req.body.remindNum, function(result){
            console.log("data deleted.");
            res.status(200).json(req.params.user);
            res.end();
        });
    })
;


function init(db){
    database = db;
    return router;
}


module.exports = init;

