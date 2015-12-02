var express    = require('express');
var morgan     = require("morgan");
var mongoose   = require('mongoose');    
var bodyParser = require('body-parser');
var sha1       = require('sha1');

var database   = require('./config/database');
var port       = process.env.PORT || 3000; 
var app        = express();          
var router     = express.Router();

mongoose.connect(database.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next();
});

require('./app/route/usuario')(router, mongoose, sha1);
require('./app/route/post')(router, mongoose);
require('./app/route/comentario')(router, mongoose);

app.use('/api/v1.0', router);

process.on('uncaughtException', function(err) {
	console.log(err);
});

app.listen(port);
console.log('API Posts rodando na porta ' + port);