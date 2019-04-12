var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var fs = require('fs');
var request = require("request");
var dataUtil = require("./data-util");
var _ = require("underscore");
var handlebars = exphbs.handlebars;

var app = express();
var _DATA = dataUtil.loadData().travel_history;



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */


app.get("/", function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  res.render('home', {
      data: _DATA,
      tags: tags
  });
});


app.get("/create", function(req, res) {
  res.render('create');
});

app.post('/create', function(req, res) {
  var body = req.body;

  // Transform countries
  body.countries = body.countries.split(" ");
  
  // Save new history
  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});
app.post('/api/createHistory', function(req, res) {
  var body = req.body;

  // Transform countries
  body.countries = body.countries.split(" ");
  
  // Save new history
  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  res.send("success");
});

app.get("/api/getHistory", function(req,res){
  var result=[];
  _.each(_DATA,function(data){ 
    var subresult = {
      name:data.name,
      age:data.age,
      countries:data.countries,
      gender: data.gender,
      homecountry:data.homecountry
    }
    result.push(subresult);
  })
  res.json(result);
});


app.get('/tag/:tag', function(req, res) {
  var tags = dataUtil.getAllTags(_DATA);
  var tag = req.params.tag;
  var posts = [];
  _DATA.forEach(function(post) {
      if (post.countries.includes(tag)) {
          posts.push(post);
      }
  });
  res.render('home', {
      tag: tag,
      data: posts,
      tags: tags
  });
});



app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
