const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache')

app.get('/', function (req,res){
  res.render('todolist')
})
app.post('/', function (req,res){
  let input = req.body.newestitem;
  console.log(input);
  res.render('todolist')
})

app.listen(3000, function(){
  console.log('successfully started Express Application');
})
