import React, {Component} from 'react';
import Description from './description';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Product extends Component {
    state = {
        dropdownOptions: Array.from(Array(10), (_, i) => i + 1),
        dropdownValue: "Quantity",
        product: null,
        loading: true
    }
    
    componentDidMount() {
        this.getProduct();
    }

    handleNumberOfItems = event => {
        var numberOfItems = event.target.innerHTML;
        this.setState({
            dropdownValue: numberOfItems
        });
    }

    getProduct = () => {
        axios.get(`/api/products/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({product: response.data, loading: false});
        })
        .catch(error => console.log("error", error));
    }

    handleAddToCart = () => {
        const data = {
                product: {
                    product: this.state.product, 
                    quantity: 1
                }
        };
        axios.post('/api/cart', data)
        .then(response => {
                console.log("response : ", response);
                if(response.status === 200)
                    this.props.history.push('/cart');
            }
        )
        .catch(error => console.log("error : ", error));
    }

    render() {
        return this.state.loading ? <h1>Loading...</h1> : (
            <div className="container">
                <div className="row m-2 d-flex align-items-start">
                    <div className="col-md-8 px-0 px-md-2">
                        <img    src={this.state.product.image} 
                                className="rounded w-100" 
                                style={{maxHeight: "560px"}}
                        />
                        <div className="my-2 w-100">
                            <span className="h3">{this.state.product.name}</span>
                        </div>
                    </div>
                    <div className="col-md-4 border rounded pb-2" style={{ boxShadow: "0px 0px 9px 0px gray" }}> 
                        <div className="dropdown">
                            <button className="btn btn-sm btn-info dropdown-toggle mt-3" id="dropdown" type="button" data-toggle="dropdown">
                                {this.state.dropdownValue}
                            </button>
                            <div className="dropdown-menu">
                                {this.state.dropdownOptions.map(element => 
                                    <button 
                                    className="dropdown-item" 
                                    type="button"
                                    onClick={this.handleNumberOfItems}>
                                        {element}
                                    </button>)}
                            </div>
                        </div>
                        <span className="h1 float-right">
                            {this.state.product.price.toLocaleString() + " Rs."}
                        </span>
                        <div className="">
                            {/* <Link to="/cart"> */}
                                <button className="btn btn-sm btn-warning w-100 my-1" onClick={this.handleAddToCart}>
                                <svg width="21px" height="21px" viewBox="0 0 16 16" className="bi bi-cart3 mb-1 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                                    Add to Cart
                                </button>
                            {/* </Link> */}
                            {/* <Link to=""> */}
                                <button className="btn btn-sm btn-warning w-100 my-1">
                                <svg width="21px" height="21px" viewBox="0 0 16 16" class="bi bi-credit-card mb-1 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                </svg>
                                    Buy Now
                                </button>
                            {/* </Link> */}
                        </div>
                    </div>
                    <Description />
                </div>
            </div>
        );
    }
}

export default Product;