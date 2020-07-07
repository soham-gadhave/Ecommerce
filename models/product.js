const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    price: Number    
});

const Product = mongoose.model('Product', schema);

module.exports = Product;