var express     = require("express");
var url         = require('url');
var favicon     = require("serve-favicon");
var app         = express();
var userRoutes = require("./routes/user");
var db = require("./db");

app.use(favicon(__dirname+"/favicon.ico"));
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

app.use('/api', userRoutes);

db.connectDB(function(){
    
    process.stdout.write("Starting server... ");
    app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
        console.log("Done.");
    });
    
});