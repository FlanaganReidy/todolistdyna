const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')


  let theList = {

    'errors': false,

    items : [{
      'text': "Learn Node basics",
      'done': true,
      'id':1
    },
    {
      'text': "Learn Express basics",
      'done': true,
      'id':2
    },
    {
      'text': "Learn Mustache",
      'done': true,
      'id':3,
    },
    {
      'text': "Learn HTML forms with Express",
      'done': false,
      'id':4
    },
    {
      'text': "Learn about authentication",
      'done': false,
      'id':5
    },
    {
      'text': "Learn how to connect to PostgreSQL",
      'done': false,
      'id':6
    },
    {
      'text': "Learn how to create databases",
      'done': false,
      'id':7
    },
    {
      'text': "Learn how to create databases",
      'done': false,
      'id':8
    },
    {
      'text': "Learn SQL",
      'done': false,
      'id':9
    },
    {
      'text': "Learn how to connect to PostgreSQL from Node",
      'done': false,
      'id':10
    },
    {
      'text': "Learn how to use Sequelize",
      'done': false,
      'id':11
    }
  ]
}

app.get('/', function (req,res){
  res.render('todolist', theList);
})

app.post('/', function(req, res) {
  const newesttodo = req.body.newestitem;
  req.checkBody("newestitem").notEmpty();
  let newErrors = req.validationErrors();
  if (newErrors) {
    theList.errors = "You need to at least type something!"
    res.render('todolist', theList);
  } else {
    let max = theList.items.length;
    theList.errors = false;

    console.log(newesttodo);
    let todo = {
      text: newesttodo,
      done: false,
      id: max + 1
    }
    theList.items.push(todo);
    res.redirect('/')
  }
})
app.post('/:id', function(req,res){
  let id = parseInt(req.params.id);

  theList.items.forEach( function(listItem){
    if(id === listItem.id){
      listItem.done = true;
    }
  })
  res.render('todolist', theList);
})

app.listen(3000, function(){
  console.log('successfully started Express Application');
})
