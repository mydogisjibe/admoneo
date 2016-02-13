function myBodyParser(req, res, next){
    var postData = "";
    req.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '"+ postDataChunk+"'");
    });
    
    req.addListener("end", function() {
        req.body = JSON.parse(postData);
        next();
    });
}


module.exports = myBodyParser;