import React, {Component} from 'react';
import Product from './product';
import axios from 'axios';

class Products extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        axios.get('/api/products')
        .then(response => {
            const products = response.data;
            this.setState({ products: products});
            console.log('Received');
        })
        .catch(() => console.log('error'))
    }

    render() {
        return (
            <div className="container">
                <div className="row m-2">
                    {this.state.products.map(product => (
                        <Product
                            id={product._id} 
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Products;