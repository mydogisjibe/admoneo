var request = require("request");
var queryString = require("query-string");
var assert = require("assert");
var MongoClient = require('mongodb').MongoClient;

function getUserReminders(db, user, callback) {
    db.collection("user").find({"name": user}).toArray(function(err, docs){
        
        callback(docs[0].reminders);
    });
}

MongoClient.connect("mongodb://"+process.env.IP+":27017/test", function(err, db){
    assert.equal(err, null, "Mongo had an error. ");
    console.log("Connected to database successfully.");
    
    db.collection("user").find({name: "mydogisjibe"}).toArray(function(err, docs){
        var user = docs[0];
        console.dir(user);
        for(var i =0; i<user.reminders.length; i++){
            console.dir(user.reminders[i]);
            var options = {
                to: "naomi.sagan@gmail.com",
                subject: user.reminders[i].event,
                message:user.reminders[i].message,
                from: "bob@bobdoe.com"
            };
            request("http://brentluker.com/mail.php?"+ queryString.stringify(options), function(err, res, body){
                console.log(res.statusCode);
            });
        }
        user.reminders = [];
        db.collection("user").update({name: "mydogisjibe"}, user, function(){
            db.close();
        });
    });
});


