const passportLocalMongoose = require('passport-local-mongoose'),
      mongoose              = require('mongoose');

const Schema = new mongoose.Schema({
    email: String,
    username: String,
    cart: [],
    admin: Boolean
});

Schema.plugin(passportLocalMongoose, { usernameField : 'email'});

const User = mongoose.model('User', Schema);

module.exports = User;
