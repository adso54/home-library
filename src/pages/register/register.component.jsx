import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import './register.styles.scss';

class Register extends React.Component{
    constructor(props){
        super()
        this.state= {
            email: '',
            password: '',
            confirmPassword: '',
            firstName:'',
            lastName: '',
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({[name]: value})
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
                        <div className="registerButton">
                            <Button variant="success" className="but" onClick=
                                {()=> this.props.userRegister(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword)}
                            >Register</Button>
                        </div>
                   </Form>
               </div>
           </div>
        )
    }
        
}

export default withRouter(Register);