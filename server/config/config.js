var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');


module.exports = {
	development: {
		rootPath: rootPath,
		db : process.env.dbConnectionString,
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db : process.env.dbConnectionString,
		port: process.env.PORT || 80
	}
};