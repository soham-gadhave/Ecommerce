import React, { Component } from 'react';

class Product extends Component {
    render() {
        console.log("product id in Product ", this.props.product.product._id);
        return (
                <div className="m-3 d-flex justify-content-between border rounded p-2">
                    <img src="https://picsum.photos/600/600" 
                         className="img-fluid mr-2" 
                         style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "10px"}}
                    />
                    <div className="flex-grow-1">
                        {/* <div className="d-flex justify-content-around"> */}
                            <h5 className="">{this.props.product.product.name}</h5>
                        {/* </div> */}
                        {/* <p>by Walter Rudin</p> */}
                        <div className="d-block mb-1">
                            <button className="btn btn-warning btn-sm mr-1" onClick={() => this.props.onIncrement(this.props.id)}>+</button>
                            <span className="badge badge-info">{this.props.product.quantity}</span>
                            <button className="btn btn-warning btn-sm ml-1" onClick={() => this.props.onDecrement(this.props.id)}>-</button>
                        </div>
                        <div className="d-block">
                            <button className="btn btn-danger btn-sm mr-1" onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
                        </div>
                    </div>
                    <span className="badge badge-success h-25 mt-2">{this.props.product.product.price.toLocaleString() + " Rs."}</span>
                </div>
        );
    }
}

export default Product;