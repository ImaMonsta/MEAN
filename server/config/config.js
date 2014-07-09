var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
	development: {
		rootPath: rootPath,
		db : 'mongodb://imadbuser:Soporte01@ds043368.mongolab.com:43368/imadb',
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db : 'mongodb://imadbuser:Soporte01@ds043368.mongolab.com:43368/imadb',
		port: process.env.PORT || 80
	}
};