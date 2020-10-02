const { response } = require('express');

const   express         = require('express'),
        router          = express.Router({mergeParams: true}),
        passport        = require('passport'),
        localStrategy   = require('passport-local').Strategy,
        User            = require('../models/user');

passport.use(new localStrategy({ usernameField : 'email'}, User.authenticate()));

router.post('/cart', (request, response) => {
    User.findById(request.user._id)
    .then(user => {
            console.log("user.cart ", user.cart);
            // const prod = JSON.parse(JSON.stringify(request.body.product));
            // var flag = false;
            // user.cart.forEach(product => {
            //     if(product.product._id === request.body.product.product._id) {
            //         flag = true;
            //         // break;
            //     }
            // });
            var contains = !user.cart.find(product => String(product.product._id) === String(request.body.product.product._id));
            if(contains) {
                user.cart.push(request.body.product);
                user.save();
                // console.log("user in cart: ", user);
                response.status(200).send({message: "successfully added to cart "});
            }
            else {
                console.log('Already in cart');
                response.status(200).send({message: "already exists in cart"});
            }
        }
    )
    .catch(error => {
            console.log("error: ", error);
            response.status(404).send({message: "unsuccessfully added to cart "});
        }
    );
});

router.get('/signup', (request, response) => {
    response.send('<h1>LoggedIn</h1>');
});

router.get('/login', (request, response) => {
    // console.log(request.user);
    response.json({loggedIn: request.isAuthenticated(), user: request.user});
});

router.post('/signup', (request, response) => {
    console.log(request.body);
    const newUser = {
        email: request.body.email, 
        username: request.body.username,
    }
    User.register(newUser, request.body.password)
    .then(user => {
            console.log("user: ", user, " is successfully registered")
            response.status(200).send({message: "successful signup"});
        }
    )
    .catch(error => {
            console.log("error in signup post server side", error);
            response.status(404).send({message: "unsuccessful signup"});
        }
    );
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

router.get('/logout', (request, response) => {
    request.logout();
    response.json({message: "Logged Out successfully"});
});

module.exports = router;
