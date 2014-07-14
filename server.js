var express = require('express'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);


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
passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('Username: ' + username);
      User.findOne({username:username}).exec(function(err, user) {
      	console.log(user);
        if(user) {
          console.log('hasUser');
          return done(null, user);
        } else {
          console.log('doesnothasUser');
          return done(null, false);
        }
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(err, user) {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  });

require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listen on port ' + config.port + '...');