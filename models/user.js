var db = require("./../db");
function create(user, callback){
    if(user.reminders === undefined)
        user.reminders = [];
    
    db.create("user", user, callback);
}

function read(username, callback){
    db.read("user", {username: username}, callback);
}

function all(callback){
    db.read("user", {}, callback);
}


exports.all    = all;
exports.read   = read;
exports.create = create;