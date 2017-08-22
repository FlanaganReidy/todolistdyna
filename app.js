const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const ObjectId = require('mongodb').ObjectID;


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator())

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')



const url = 'mongodb://localhost:27017/todo'

let database;


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected Successfullly to mongodb');
  database = db;
});


app.get('/', function(req, res) {

  let findTodos = function(db, callback) {
    // Get the documents collection
    let collection = db.collection('todos');
    // Find some documents
    collection.find({}).toArray(function(err, todos) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(todos)
      res.render('todolist', {
        items: todos
      });
    });
  }
  findTodos(database);
})

app.post('/', function(req, res) {

  const newesttodo = req.body.newestitem;
    let collection = database.collection('todos');
    collection.insertOne({
    'text': newesttodo,
    'done': false,
    'new':true
  }, function(err,result) {
    console.log("this is the result" + result);
    collection.find({}).toArray(function(err, todos) {
      assert.equal(err, null);
      console.log("Found the following records" + todos.length);
      res.render('todolist', {
        items: todos
      });
    });
  })
})
app.post('/:id', function(req, res) {
  let id = req.params.id;
  console.log("we\'re in the post the id is" + id);
  let collection = database.collection('todos');
  collection.updateOne({_id: new ObjectId(id)}, {$set: {done: true}}, function(err,result) {
    console.log("this is the result" + result);
    collection.find({}).toArray(function(err, todos) {
      assert.equal(err, null);
      console.log("Found the following records" + todos.length);
      res.render('todolist', {
        items: todos
      });
    });
  });

})


app.listen(3000, function() {
  console.log('successfully started Express Application');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function() {
    console.log('mongodb disconnectd on app termination');
    process.exit(0);
  });
});
