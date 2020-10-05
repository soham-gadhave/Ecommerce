import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        email: "",
        password: "",
    }
    
    handleLogin = event => {
        event.preventDefault();
        const data = {
            email: this.state.email, 
            password: this.state.password
        };
        axios.post('/api/login', data)
        .then(response => {
            if(response.status === 200) {
                this.props.setLoginStatus({loggedIn: true});
                this.props.history.push('/products');
            }
        })
        .catch(error => console.log('error is :', error));
    }

    handleChange = event => {
        const property  = event.target.name,
              value     = event.target.value;
        this.setState({[property]: value});
    }

    render() { 
        if(this.props.loggedIn) {
            console.log('Working');
            return <Redirect to="/products" />
        }
        else {
            if(this.props.loading)
                return(<div></div>);
            else {    
                return (
                    <div className="container d-flex justify-content-center mt-5">
                        <form className="w-50 mt-2" onSubmit={this.handleLogin}>
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
    }
}
 
export default Login;

// import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';
// import axios from 'axios';
// import loginStatus from './loginStatus'

// class Login extends Component {
//     state = {
//         email: "",
//         password: "",
//         // loggedIn: false
//     }
    
//     // loggenIn = false;

//     setLogInStatus = (status) => {
//         console.log("status ", status)
//         loginStatus.loggedIn = status; 
//     }

//     handleLogin = event => {
//         event.preventDefault();
//         const data = {
//             email: this.state.email, 
//             password: this.state.password
//         };
//         axios.post('/login', data)
//         .then(response => {
//             // console.log("response status code: ", response.status);
//             if(response.status === 200) {
//                 // this.setState({loggedIn: true});
//                 this.setLogInStatus(true);
//                 this.props.history.push('/products');
//             }
//         })
//         .catch(error => console.log('error is :', error));
//     }

//     handleChange = event => {
//         const property  = event.target.name,
//               value     = event.target.value;
//         this.setState({[property]: value});
//     }

//     // componentDidMount() {
//     //     this.getLoggedInStatus();
//     // }

//     // getLoggedInStatus = () => {
//     //     axios.get('/login')
//     //     .then(response => {
//     //         console.log("response.data is: ", response.data.loggedIn);
//     //         // this.setState({loggedIn: response.data.loggedIn});
//     //         this.setLogInStatus(response.data.LoggedIn);
//     //         // if(response.data.loggedIn)
//     //         //     this.props.history.push('/products');
//     //     })
//     //     .catch(error => console.log("error is : ", error));
//     //     // return loggedIn;
//     // }

//     render() { 
//         // this.getLoggedInStatus();
//         // console.log("loggedIn is: ", this.state.loggedIn);
//         // this.getLoggedInStatus();
//         console.log('loginStatus.loggedIn : ', loginStatus.loggedIn);
//         if(loginStatus.loggedIn) {
//             console.log('Working');
//             return <Redirect to="/products" />
//         }
//         else {
//             console.log('not working');
//             return (
//                 <div className="container d-flex justify-content-center mt-5">
//                     <form className="w-50 mt-2" action="/login" method="POST" onSubmit={this.handleLogin}>
//                         <div className="form-group">
//                             <label for="exampleInputEmail1">Email address</label>
//                             <input type="email" className="form-control" name="email" onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" required/>
//                             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                         </div>
//                         <div className="form-group">
//                             <label for="exampleInputPassword1">Password</label>
//                             <input type="password" className="form-control" name="password" onChange={this.handleChange} id="exampleInputPassword1" required/>
//                         </div>
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </form>
//                 </div>
//             );
//         } 
//     }
// }
 
// export default Login;