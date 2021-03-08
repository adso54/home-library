import React from 'react';
import {Form, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './login.styles.scss';

class LogIn extends React.Component{
    constructor(){
        super()
        this.state= {
            email: '',
            password: '',
            passwordReset: false,
            passwordResetEmailSend: false
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleResetPassword = (e) =>{
        this.setState({passwordReset: true})
    }

    passwordReset = (email) => {
        this.setState({passwordResetEmailSend: true})

        fetch(process.env.REACT_APP_SERV_ADRESS + '/user/passwordReset', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                appLink: process.env.REACT_APP_SERV_ADRESS + '/user/changePassword/'
            })
        })
    }

    render(){
        return(
           <div className="logIn">
               <div className="logInForm">
                   {this.state.passwordResetEmailSend === false ?
                    <Form>
                        <h1 className="title">
                            {this.state.passwordReset === false ? 'Sign In': 'Reset password' }
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
                                {this.state.passwordReset === false ?
                                    <div>
                                        <Form.Label className='label' >Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password" 
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            name="password"
                                        />
                                        <Link to='#' className="navbar-link"  onClick={this.handleResetPassword}>
                                            Forgot password
                                        </Link> 
                                    </div>
                                : null
                                }
                            </Form.Group>
                        
                            <div className="logInButton">
                            {this.state.passwordReset === false ? 
                                <Button 
                                    variant="success" 
                                    className="but" 
                                    onClick={()=> this.props.userSignIn(this.state.email, this.state.password)}>Sign In 
                                </Button>
                            : 
                                <Button 
                                    variant="success" 
                                    className="but" 
                                    onClick={()=> this.passwordReset(this.state.email)}>Password reset 
                                </Button>
                            }
                            </div>
                    </Form>
                   :
                    <h1 className="title">
                        Check your email for reset password!
                    </h1>
                   }
               </div>
           </div>
        )
    }
        
}

export default LogIn;