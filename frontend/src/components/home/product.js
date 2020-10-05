import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Product extends Component {
    // state = {
    //     name: 'Laptop',
    //     image: 'https://picsum.photos/500/400',
    //     price: 499
    // }

    render() {
        return (
            <div className="col-sm-6 col-md-4 p-1">
                <Link to={`/products/${this.props.id}`} className="d-flex justify-content-center" style={{ textDecoration: 'none' }}>
                    <div className="card mx-1" style={{width: "90%"}}>
                        <img src={this.props.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{this.props.name}</h5>
                            <div className="d-flex justify-content-end">
                                <span className="badge badge-warning m-2">{this.props.price} Rs.</span>
                            </div>
                            {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                    </div>
                    {/* <img src={this.props.image} className="w-100 h-75"/>
                    <p className="h4 text-dark">
                        {this.props.name}
                    </p>
                    <div className="d-flex justify-content-end">
                        <span className="badge badge-warning m-2">{this.props.price} Rs.</span>
                    </div> */}
                </Link>
            </div>
        );
    }
}

export default Product;