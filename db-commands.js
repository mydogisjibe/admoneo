var assert = require("assert");
function insertUser(db, username, password, callback){
  db.collection('user').insertOne( {
      "name": username,
      "password": password,
      "reminders":[]
    }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the users collection.");
    callback(result);
  });
}

var findUser = function(db, callback) {
   db.collection('user').find().toArray(function(err, docs){
        assert.equal(err, null);
        callback(docs);
   });
};

function getUserReminders(db, user, callback) {
    db.collection("user").find({"name": user}).toArray(function(err, docs){
        
        callback(docs[0].reminders);
    });
}

function createUserReminder(db, username, reminder, callback) {
    console.log(username);
    var collection = db.collection("user");
    collection.find({"name": username}).toArray(function(err, docs){
        assert.equal(err, null);
        console.dir(docs);
        var user = docs[0];
        user.reminders.push(reminder);
        db.collection("user").update({_id: user._id}, user);
        callback(true);
    });
}

function deleteUserReminder(db, username, remindNum, callback){
    var collection = db.collection("user");
    collection.find({"name": username}).toArray(function(err, docs){
        assert.equal(err, null);
        console.dir(docs);
        var user = docs[0];
        user.reminders.splice(remindNum, 1);
        db.collection("user").update({_id: user._id}, user);
        callback(true);
    });
}

function updateUserReminder(db, username, remindNum, reminder, callback) {
    var collection = db.collection("user");
    collection.find({"name": username}).toArray(function(err, docs){
        assert.equal(err, null);
        var user = docs[0];
        user.reminders[remindNum] = reminder;
        db.collection("user").update({_id: user._id}, user);
        callback(true);
    });
}

exports.deleteUserReminder = deleteUserReminder;
exports.updateUserReminder = updateUserReminder;
exports.createUserReminder = createUserReminder;
exports.getUserReminders = getUserReminders;
exports.insertUser = insertUser;
exports.findUser = findUser;