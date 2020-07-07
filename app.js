// const { response } = require('express');

const   express     = require('express'),
        mongoose    = require('mongoose'),
        path        = require('path'),
        morgan      = require('morgan'),
        app         = express(),
        PORT        = process.env.PORT || 5000;
        Product     = require('./models/product');

mongoose.connect("mongodb://localhost/MERN");

const   productRoutes     = require('./routes/product');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Product.remove({});

// var products = [
//     {
//         name: 'Laptop',
//         image: 'https://picsum.photos/500/400',
//         price: 54999,
//         categoty: 'Electronics'
//     },
//     {
//         name: 'GTA V',
//         image: 'https://picsum.photos/500/400',
//         price: 1499,
//         categoty: 'Gaming'
//     },
//     {
//         name: 'Principles Of Mathematical Analysis',
//         image: 'https://picsum.photos/500/400',
//         price: 349,
//         categoty: 'Books'
//     },
//     {
//         name: 'Hard Disk 1TB',
//         image: 'https://picsum.photos/500/400',
//         price: 5499,
//         categoty: 'Electronics'
//     }
// ];


// products.forEach(product => 
//     Product.create(product)
//     .then(product => console.log('product :', product))
//     .catch(error => console.log(error))
// );

// app.get('/', (request, response) => {
//     response.json({
//         firstname: "Soham",
//         lastname: "Gadhave"
//     });
// });

app.use("/", productRoutes);

app.listen(PORT, () => console.log('Server is up and running'));