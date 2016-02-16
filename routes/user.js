var express = require("express");
var router = express.Router();

var urlEncodeParser = require("./../my-body-parser");
var User = require("./../models/user.js");
var Reminder = require("./../models/reminder.js");

router.route("/")
    .get(function(req, res){
        User.all(function(users){
            res.json(users);
            res.end();
        });
    })
;

router.route("/:user")
    .get(function(req, res){
        Reminder.all(req.params.user, function(reminders){
            res.json(reminders);
            res.end();
        });
    })
    .post(urlEncodeParser, function(req, res){
        console.dir(req.body);
        console.log(req.params.user);
        Reminder.create(req.params.user, req.body.reminder, function(result){
            res.status(201).json(req.params.user);
            res.end();
        });
    })
    .put(urlEncodeParser, function(req, res){
        Reminder.update(req.params.user, req.body.remindNum, req.body.reminder, function(result){
            res.status(200).json(req.params.user);
            res.end();
        });
    })
    .delete(urlEncodeParser, function(req, res){
        Reminder.remove(req.params.user, req.body.remindNum, function(result){
            res.status(200).json(req.params.user);
            res.end();
        });
    })
;


module.exports = router;

