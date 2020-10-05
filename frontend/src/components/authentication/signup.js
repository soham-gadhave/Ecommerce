import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    state = {
        username: "",
        email: "",
        password: ""
    }

    handleSignup = event => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password
        };
        axios.post('/api/signup', data)
        .then(response => {
            console.log("response: ", response)
            if(response.status === 200)
                this.props.history.push('/products');
        })
        .catch(error => console.log('error :', error));
    }

    handleChange = event => {
        const property  = event.target.name,
              value     = event.target.value;
        this.setState({[property]: value});
    }

    render() { 
        // console.log('State: ', this.state);
        return (
            <div className="container d-flex justify-content-center mt-5">
                <form className="w-50 mt-2" onSubmit={this.handleSignup}>
                    <div className="form-group">
                        <label for="exampleInputUsername1">Username</label>
                        <input type="text" className="form-control" name="username" onChange={this.handleChange} id="exampleInputUsername1" required/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" name="email" onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} id="exampleInputPassword1" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}
 
export default Signup;