
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
var mapping= require('./routes/mapping'); 
app.get('/aboutme',mapping.aboutmepage);
app.get('/houtaibackend',mapping.houtaibackend);
app.get('/availabletime',mapping.showtimepage);

var houtai= require('./routes/houtai'); 
app.post('/addonetime',houtai.addonetime);
app.post('/getalltime',houtai.getalltime);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
