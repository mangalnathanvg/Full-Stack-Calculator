var express = require('express');

var app = new express();
var parser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url ='mongodb://localhost:27017';

const dbName ="history";

const insertDocuments = function(db, callback, item) {
    // Get the documents collection
    const collection = db.collection('historylog');
    // Insert some documents
    collection.insert(
      item
    , function(err, result) {
      console.log("Inserted documents into the collection");
      callback(result);
    });
  }

/* MongoClient.connect(url,function(err,client){
    console.log("\n------------------------------\nConnected to Mongo Database!!\n------------------------------\n");
    const db = client.db(dbName);

    insertDocuments(db,function(){
        client.close();
    },"Mangal");
});  */


app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.render('./../app/index.ejs', {});
})
.post('/insertdata',function(req,res){
    const newData = req.body;
    MongoClient.connect(url,function(err,client){

        console.log("Connected!!!");
        const db = client.db(dbName);
        insertDocuments(db, function(){
            client.close();
        },newData);
    });

});
app.use(express.static(__dirname + '/../.tmp'))
app.listen(7777);


console.log("Magic happens at port number 7777");