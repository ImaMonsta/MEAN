var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
//console.log('Hola');

var MONGOHQ_URL='mongodb://imadbuser:Soporte01@ds043368.mongolab.com:43368/imadb'

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile		
	}
));
app.use(express.static(__dirname + '/public'));

/////////////////MONGOOSE
mongoose.connect(MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error ...'));
db.once('open', function callback(){
	console.log('karuru db open');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('messages', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err,messageDoc){
	mongoMessage = messageDoc.message;
});


app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index', {mongoMessage: mongoMessage});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listen on port ' + port + '...');