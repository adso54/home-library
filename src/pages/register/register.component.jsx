import React from 'react';
import {Form, Col, Button, Alert} from 'react-bootstrap'

import './register.styles.scss';

class Register extends React.Component{
    constructor(){
        super()
        this.state= {
            email: '',
            password: '',
            confirmPassword: '',
            firstName:'',
            lastName: '',
            error: null,
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    error = (err) => {
        this.setState({error: err})
    }

    onSubmitRegister = () => {
        if(this.state.password === this.state.confirmPassword){
            this.error(null)
            fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                })
            })
                .then( response => response.json())
                .then(user => {
                    // if(user.id){
                    //   this.props.loadUser(user);
                    //   this.props.onRouteChange('home');
                    // }
                })
        }else{
            this.error("Passwords don't match!")
        }
        
    }

    render(){
        return(
           <div className="register">
               <div className="registerForm">
                   <Form>
                       <h1 className="title">
                           Register form
                       </h1>
                        <Form.Group as={Col} controlId="formGridTitle" >
                            <Form.Label className='label' >First name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="First name" 
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                name="firstName"
                            />
                            <Form.Label className='label' >Last name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Last name" 
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                name="lastName"
                            />
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
                            <Form.Label className='label' >Confirm password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm password" 
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                name="confirmPassword"
                            />
                        </Form.Group>
                        {this.state.error !== null ? 
                            <Alert variant='danger'>
                                {this.state.error}
                            </Alert>
                            : null
                        }
                        <div className="registerButton">
                            <Button variant="success" className="but" onClick={this.onSubmitRegister}>Register</Button>
                        </div>
                   </Form>
               </div>
           </div>
        )
    }
        
}

export default Register;