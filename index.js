var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var app = express();
var assert = require("assert");
var session = require('express-session');
var ejs = require("ejs");
//var ObjectId = require('mongodb').ObjectID;
var genuuid = require("uuid");
var cookieParser = require("cookie-parser");
var queryString = require("query-string");
var url = require('url');

var dbCommands = require("./db-commands");
var secrets = require("./secrets");
var userRoutes = require("./routes/user");



app.use(function(req, res, next){
    console.log(req.url + " " + req.method);
    next();
});

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({ genid: function(req) {
    return genuuid(); // use UUIDs for session IDs
  },
    secret: secrets.cookieSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('./public'));


app.get("/form", function(req, res){
    var query = url.parse(req.url, true).query;
    
    res.render(__dirname+"/views/form", {data: query});
});

MongoClient.connect("mongodb://"+process.env.IP+":27017/test", function(err, db){
    assert.equal(err, null, "Mongo had an error. ");
    console.log("Connected to database successfully.");
    
    app.use('/api', userRoutes(db));
    
    process.stdout.write("Starting server... ");
    app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
        console.log("Done.");
    });
    
});

