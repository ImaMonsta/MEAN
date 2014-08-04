var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	courseModel = require('../models/Course');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'conection error ...'));
	db.once('open', function callback(){
		console.log('karuru db open');
	});

	userModel.createDefaultUsers();
	courseModel.createDefaultCourses();
};



