import React, { Component } from 'react';

class Checkout extends Component {
    // props = {
    //     totalAmount: 349*4,
    //     products: [       
    //         {price: 349, quantity: 1},
    //         {price: 349, quantity: 2},
    //         {price: 349, quantity: 2},
    //         {price: 349, quantity: 3}
    //     ]
    // }
    render() {
        const totalAmount = this.props.products.map(product => product.product.price*product.quantity).reduce((prev, next) => prev + next); 
        return (
            <React.Fragment>
                <h2>Total Amount: {totalAmount} Rs.</h2>
                <div>
                    {this.props.products.map(element => <p className="m-0 text-right h5">{element.product.price*element.quantity} Rs.</p>)}
                </div>
                <hr></hr>
                <p className="text-right h5">Subtotal: {totalAmount} Rs.</p>
                <button className="btn btn-primary float-right">Checkout</button>
            </React.Fragment>
        );
    }
}
 
export default Checkout;