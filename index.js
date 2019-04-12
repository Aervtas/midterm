var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var marked = require('marked');
var _ = require("underscore");

var app = express();

var _DATA = dataUtil.loadData().game_reviews;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){
  //res.render('home',{});
  var tags = dataUtil.getAllTags(_DATA);
  res.render('home', {
      data: _DATA,
      tags: tags
  });
})

app.get("/addReview", function(req, res) {
    res.render('create');
});

app.post('/addReview', function(req, res) {
    var body = req.body;

    // Transform tags and content
    body.tags = body.tags.split(" ");
    body.review = marked(body.review);

    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});

app.get('/adult', function(req, res) {
  var contents = "";
  var result = _.filter(_DATA, function(obj){
    if(obj['age'] >= 18){
      return obj;
    }
  });
  for (var i = 0; i < result.length; i++) {
    contents += '<tr><td>' + result[i]['name'] + ':</td><td>' + result[i]['age'] + ':</td><td>' + result[i]['game'] + ':</td><td>' + result[i]['review'] + '</td></tr>';
  }
  var html = '<html>\n<body>\n<table>'+contents+'</table>\n</body>\n</html>';
  res.send(html);
});
app.get('/child', function(req, res) {
  var contents = "";
  var result = _.filter(_DATA, function(obj){
    if(obj['age'] < 18){
      return obj;
    }
  });
  for (var i = 0; i < result.length; i++) {
    contents += '<tr><td>' + result[i]['name'] + ':</td><td>' + result[i]['age'] + ':</td><td>' + result[i]['game'] + ':</td><td>' + result[i]['review'] + '</td></tr>';
  }
  var html = '<html>\n<body>\n<table>'+contents+'</table>\n</body>\n</html>';
  res.send(html);
});
app.get('/random', function(req, res) {
  var rand = Math.floor((Math.random() * _DATA.length) + 0);
  var contents = '<tr><td>' + _DATA[i]['name'] + ':</td><td>' + _DATA[i]['age'] + ':</td><td>' + _DATA[i]['game'] + ':</td><td>' + _DATA[i]['review'] + '</td></tr>';
  var html = '<html>\n<body>\n<table>'+contents+'</table>\n</body>\n</html>';
  res.send(html);
});
app.get('/youngtoold', function(req, res) {
  var contents = "";
  var result = _.sortBy(_DATA, function(obj){
    return Number(obj['age']);
  });
  for (var i = 0; i < result.length; i++) {
    contents += '<tr><td>' + result[i]['name'] + ':</td><td>' + result[i]['age'] + ':</td><td>' + result[i]['game'] + ':</td><td>' + result[i]['review'] + '</td></tr>';
  }
  var html = '<html>\n<body>\n<table>'+contents+'</table>\n</body>\n</html>';
  res.send(html);
});

app.get('/game', function(req, res) {
  var contents = "";
  var games = [];
  for (var i = 0; i < _DATA.length; i++) {
    games.push(_DATA[i]['game']);
  }
  games = _.uniq(games);
  for (var i = 0; i < games.length; i++) {
    contents += '<tr><td><a href="/game/'+games[i]+'">'+games[i]+'</a></td></tr>'
  }
  var html = '<html>\n<body>\n<table>'+contents+'</table>\n</body>\n</html>';
  res.send(html);
});
app.get('/game/:game_name', function(req, res) {
  var contents = "";
  var _gname = req.params.game_name;
  var result = _.filter(_DATA, function(obj){
    if(obj['game'] == _gname){
      return obj;
    }
  });
  for (var i = 0; i < result.length; i++) {
    contents += '<tr><td>' + result[i]['name'] + ':</td><td>' + result[i]['age'] + ':</td><td>' + result[i]['game'] + ':</td><td>' + result[i]['review'] + '</td></tr>';
  }
  var html = '<html>\n<body>\n<table>'+contents+'</table>\n</body>\n</html>';
  res.send(html);
});

app.get('/api/reviews', function(req, res) {
  res.send(_DATA);
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
