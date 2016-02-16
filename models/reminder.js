var db = require("./../db");

function create(username, reminder, callback){
  db.read("user", {username: username}, function(docs){
    var user = docs[0];
    user.reminders.push(reminder);
    db.update("user", {_id: user._id}, user, callback);
  });
}
function all(username, callback){
  db.read("user", {username: username}, function(docs){
    callback(docs[0].reminders);
  });
}

function remove(username, remindNum, callback){
  db.read("user", {username: username}, function(docs){
    var user = docs[0];
    user.reminders.splice(remindNum, 1);
    db.update("user", {_id: user._id}, user, callback);
  });
}

function update(username, remindNum, reminder, callback){
  db.read("user", {username: username}, function(docs){
    var user = docs[0];
    user.reminders[remindNum] = reminder;
    db.update("user", {_id: user._id}, user, callback);
  });
}


exports.create = create;
exports.all = all;
exports.remove = remove;
exports.update = update;