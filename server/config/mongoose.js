var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'conection error ...'));
	db.once('open', function callback(){
		console.log('karuru db open');
	});
};

var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	salt: String,
	hashed_pwd: String,
	roles: [String]
});
userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	}
};

var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err, collection){
	if(collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'German');
			User.create({firstName:'German', lastName:'Garcia', username:'German', salt: salt, hashed_pwd:hash});
			salt = createSalt();
			hash = hashPwd(salt, 'Elisa');
			User.create({firstName:'Elisa', lastName:'Calderon', username:'Elisa', salt: salt, hashed_pwd:hash});
	}
});

function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}