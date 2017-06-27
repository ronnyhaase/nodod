require('babel-register');
require('babel-polyfill');

var runServer = require('./server').runServer;
var program = require('commander');
var package = require('./package.json');

program
	.version(package.version)
	.option('-p --port [port]', 'Port to listen to')
	.parse(process.argv);

var port = program.port || 8080;

if (runServer({ logging: true, port: port })) {
	console.log('Nodo up and running!\nPort = ' + port + '\nPID = ' + process.pid);
}
