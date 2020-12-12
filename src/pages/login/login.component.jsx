import React from 'react';
import {Form, Col, Button} from 'react-bootstrap'

import './login.styles.scss';

class LogIn extends React.Component{
    constructor(){
        super()
        this.state= {
            email: '',
            password: ''
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:8080/user/signIn', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( response => response.json())
            .then(user => {
                if(user.id){
                //   this.props.loadUser(user);
                //   this.props.onRouteChange('home');
                // this.props.history.push("/");
                }
                console.log(user)
            })
        
    }

    render(){
        return(
           <div className="logIn">
               <div className="logInForm">
                   <Form>
                       <h1 className="title">
                           Sign In
                       </h1>
                        <Form.Group as={Col} controlId="formGridTitle" >
                            <Form.Label className='label' >Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Email" 
                                value={this.state.email}
                                onChange={this.handleChange}
                                name="email"
                            />
                            <Form.Label className='label' >Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                            />
                        </Form.Group>
                        <div className="logInButton">
                            <Button variant="success" className="but" onClick={this.onSubmitSignIn}>Sign In</Button>
                        </div>
                   </Form>
               </div>
           </div>
        )
    }
        
}

export default LogIn;