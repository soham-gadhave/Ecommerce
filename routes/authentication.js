const   express         = require('express'),
        router          = express.Router({mergeParams: true}),
        passport        = require('passport'),
        localStrategy   = require('passport-local').Strategy,
        User            = require('../models/user');

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

passport.use(new localStrategy({ usernameField : 'email'}, User.authenticate()));

router.get('/signup', (request, response) => {
    response.send('<h1>LoggedIn</h1>');
});

router.get('/login', (request, response) => {
    response.json({loggedIn: request.isAuthenticated()});
});

router.post('/signup', (request, response) => {
    console.log(request.body);
    const newUser = {
        email: request.body.email, 
        username: request.body.username,
    }
    User.register(newUser, request.body.password)
    .then(user => console.log("user: ", user, " is successfully registered"))
    .catch(error => console.log("error", error));
    response.redirect('/signup');
});

router.post('/login', passport.authenticate('local'), (request, response) => {
    if(request.isAuthenticated())
        // response.json('successful login');
        response.status(200).send({message: 'successful login'});
    else {
        console.log('Not authenticated');
        response.status(404).send({message: 'unsuccessful login'});
    }
});

module.exports = router;
