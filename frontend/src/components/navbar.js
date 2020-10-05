import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Navbar extends Component {
    
    handleLogout = () => {
        console.log("After clicking logout button: ", this.props.loggedIn);
        axios.get('/api/logout')
        .then(response => {
            console.log("response is", response.data);
            this.props.setLoginStatus({loggedIn: false, user: null});
            this.props.history.push('/products');
        })
        .catch(error => console.log("Error is: ", error));
    }

    render() {
        const notLoggedIn = ( <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="m-2 nav-link" to="/login">Login <span className="sr-only"></span></Link>
                                    </li>
                                    <li className="m-2 nav-item">
                                        <Link className="nav-link" to="/signup">Sign-Up</Link>
                                    </li> 
                                </React.Fragment> ),
        LoggedIn          = ( <React.Fragment>
                                    <li className="nav-item">
                                        <button className="m-2 btn btn-danger btn-sm" onClick={this.handleLogout}>Logout</button>
                                    </li> 
                                </React.Fragment> );

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand h1 mt-2" to="/products">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {this.props.loggedIn ? LoggedIn : notLoggedIn}
                        <li className="nav-item">
                            <Link className="m-2 nav-link" to="/cart">
                                <svg width="21px" height="21px" viewBox="0 0 16 16" className="bi bi-cart-fill mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                                <span>Cart</span>
                            </Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default Navbar;