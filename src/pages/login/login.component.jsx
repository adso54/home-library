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
                            <Button variant="success" className="but" onClick={()=> this.props.userSignIn(this.state.email, this.state.password)}>Sign In</Button>
                        </div>
                   </Form>
               </div>
           </div>
        )
    }
        
}

export default LogIn;