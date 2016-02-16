var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var app = express();
var assert = require("assert");
var url = require('url');

var userRoutes = require("./routes/user");
var db = require("db");



app.use(function(req, res, next){
    console.log(req.url + " " + req.method);
    next();
});

app.set('view engine', 'ejs');
app.use(express.static('./public'));


app.get("/form", function(req, res){
    var query = url.parse(req.url, true).query;
    
    res.render(__dirname+"/views/form", {data: query});
});

app.use('/api', userRoutes(db));

MongoClient.connect("mongodb://"+process.env.IP+":27017/test", function(err, db){
    assert.equal(err, null, "Mongo had an error. ");
    console.log("Connected to database successfully.");
    
    process.stdout.write("Starting server... ");
    app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
        console.log("Done.");
    });
    
});

