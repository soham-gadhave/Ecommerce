const   express     = require('express'),
        router      = express.Router({mergeParams: true}),
        Product     = require('../models/product');

router.get('/', (request, response) => {
    Product.find({})
    .then(data => response.json(data))
    .catch(error => console.log(error));    
});

router.get('/:id', (request, response) => {
    Product.findById(request.params.id)
    .then(data => response.json(data))
    .catch(error => console.log(error));
});

// router.get('/cart', (response, render) => {
    
// });

module.exports = router;