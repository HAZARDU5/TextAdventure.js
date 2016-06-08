// === Server Flags ===
var debugMode = true;

// === Initialize Live Reload ===

if(debugMode){
	livereload = require('livereload');
	server = livereload.createServer();
	server.watch(__dirname);
}



// === Initilize Express ===
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

// === Create Console ===
var con = require('./console/console.js');

if(debugMode) {
	app.use(require('connect-livereload')({
		port: 8081,
		ignore: ['.md', '.txt']
	}));
}

// === Import Necessary Functionality ==
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/terminal'));
app.use(session({secret: '1234567890QWERTY', resave: false, saveUninitialized: true}));

// === Start Server ===
var server_port = process.env.PORT || 3000;
var server_ip_address = process.env.IP || '127.0.0.1'
var server = app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});



// // === Open Browser ===
var open = require('open');
open('https://text-adventure-hazardu5.c9users.io:8080');

// === Respond to AJAX calls ===
app.post('/console', function(req,res){
	debug(req.body.input);
	res.json({response: con.input(req.body.input, req.session.id)});
});

// === Helper Functions ===
function debug(debugText){
	if(debugMode){
		console.log(debugText);
	}
}