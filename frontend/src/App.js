import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';
import Navbar from './components/navbar';
// import Products from './components/home/products'
import Prods from './components/home/products'
import Product from './components/product/product';
import Login from './components/authentication/login';
import Signup from './components/authentication/signup';
import Products from './components/cart/products';

class App extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true
    }

    setLoginStatus = status => {
        this.setState(status);
    }

    getLoginStatus = async () => {
        await axios.get('/api/login')
                .then(response => {
                    console.log("response.data.user is: ", response.data.user);
                    this.setState({loggedIn: response.data.loggedIn, user: response.data.user, loading: false});
                    // if(response.data.loggedIn)
                    //     this.props.history.push('/products');
                })
                .catch(error => console.log("error is : ", error));
    }

    componentDidMount() {
        this.getLoginStatus();
    }

    render() {
        return (
            <Router>
                <Navbar
                    {...this.props} 
                    loggedIn={this.state.loggedIn} 
                    setLoginStatus={this.setLoginStatus}
                />
                <Switch>
                    <Route path="/products" exact component={Prods} />
                    <Route path="/products/:id" exact render = {props => <Product {...props} user={this.state.user} /> } />
                    <Route path="/cart" exact render={props => <Products {...props} user={this.state.user} />} />
                    <Route path="/login" exact render={props => <Login
                            {...props} 
                            setLoginStatus={this.setLoginStatus} 
                            loggedIn={this.state.loggedIn}
                            loading={this.state.loading}
                        />} 
                    />
                    <Route path="/signup" exact component={Signup} />
                </Switch>
            </Router>
        );
    }
}

export default App;
