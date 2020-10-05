import React, {Component} from 'react';
import Product from './product';
import Checkout from './checkout';
import axios from 'axios';

class cartProducts extends Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         products: this.props.user.cart
    //     }
    //     console.log("user in constructor :", this.props.user);
    // }

    state = {
        products: [],
        gotUser: false
    };

    componentDidMount() {
        if(!this.state.gotUser)
            this.getLoginStatus();
    }

    getLoginStatus = async () => {
        await axios.get('/api/login')
                .then(response => {
                    console.log("response.data.user is: ", response.data.user);
                    this.setState({products: response.data.user.cart, gotUser: true});
                    console.log("asdfghj" + response.data.user.cart.length)
                    // if(response.data.loggedIn)
                    //     this.props.history.push('/products');
                })
                .catch(error => console.log("error is : ", error));
    }
      
    handleIncrement = id => {
        console.log("invoked");
        var products = [...this.state.products];
        var index = products.findIndex(element => element.product._id === id);
        products[index] = {...products[index]}
        products[index].quantity++;
        this.setState({products: products});
    }

    handleDecrement = id => {
        console.log("invoked");
        var products = [...this.state.products];
        var index = products.findIndex(element => element.product._id === id);
        products[index] = {...products[index]}
        products[index].quantity--;
        if(products[index].quantity >= 1)
            this.setState({products: products});
        else
            this.handleDelete(id);
    }

    handleDelete = id => {
        var products = this.state.products.filter(element => element.product._id !== id);
        this.setState({products: products});
        console.log("handleDelete : ", this.state.products);
    }

    render() {
        console.log("cart in render :", this.state.products);
        if(this.state.products.length) {
            return (
                <div className="container-fluid">
                    <div className="row m-2">
                        <span className="h4 w-100">Shopping Cart <span className="badge badge-pill badge-secondary">{this.state.products.length}</span></span>
                        <div className="col-sm-9 col-md-8">
                            {this.state.products.map(product => 
                                <Product 
                                    key={product.product._id}
                                    id={product.product._id}
                                    product={product}
                                    onIncrement={this.handleIncrement}
                                    onDecrement={this.handleDecrement}
                                    onDelete={this.handleDelete}
                                />
                            )}
                        </div>
                        <div className="col-sm-3 col-md-4 border rounded p-2" style={{maxHeight: "300px", boxShadow: "0 0 10px 0px grey"}}>
                            <Checkout 
                                products={this.state.products}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return <div>Loading</div>;
    }
}

export default cartProducts;