import React from 'react';
import {Form, Col, Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom';
import './change-password.styles.scss';

class ChangePassword extends React.Component{
    constructor(){
        super()
        this.state= {
            password: '',
            confirmPassword: '',
            token: ''
        }
    }

    componentDidMount = () => {
        const token = this.props.match.params.token;
        if(token) {
            this.setState({token: token})
        }
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({[name]: value})
    }



    render(){
        return(
           <div className="changePassword">
               <div className="changePasswordForm">
                    <Form>
                        <h1 className="title">
                           Change Password
                        </h1>
                            <Form.Group as={Col} controlId="formGridTitle" >
                                <Form.Label className='label'>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                />
                                <div>
                                    <Form.Label className='label' >ConfirmPassword</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Confirm password" 
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                        name="confirmPassword"
                                    />
                                </div>

                            </Form.Group>
                        
                            <div className="changePasswordButton">
                                <Button 
                                    variant="success" 
                                    className="but" 
                                    // onClick={()=> }
                                >Change password
                                </Button>
                            </div>
                    </Form>
               </div>
           </div>
        )
    }
        
}

export default withRouter(ChangePassword);