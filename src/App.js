//Libraries
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
//Styles
import './App.css';
//Pages:
import HomePage from './pages/homepage/homepage.component';
import BookDetails from './pages/bookdetails/bookdetails.component';
import Register from './pages/register/register.component';
import LogIn from './pages/login/login.component';
//Components
import NavbarKD from './components/navbar/navbar.component';
import Message from './components/message/message.component';
//Utilities
import VARIANT from './assets/communicate-variants.js';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null
      },
      message: {
        text: null,
        variant: null
      }
    }
  }

  userUpdate = (user) => {
      this.setState(state => ({
        ...state,  
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
    }))
  }

  signOut = () => {
    this.setState(state =>({
      ...state,
      user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null
      }
    }))
  }

  communicateHandler = (text, variant) =>{ 
    this.setState(state => ({ 
      ...state,
      message: {
        text: text,
        variant: variant
      }
    }))
    setTimeout(()=> {
      this.setState(state => ({ 
        ...state,
        message: {
          text: null,
          variant: null
        }
      }))
    }, 5000) 
  }
  

  userSignIn = (email, password) => {
    fetch('http://localhost:8080/user/signIn', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then( response => response.json())
        .then(user => {
            if(user.id){
              this.userUpdate(user);          
              this.props.history.push("/");
            }else{
              this.communicateHandler("Bad credentials!", VARIANT.DANGER)
            }
        })
  }

  userRegister = (firstName, lastName, email, password, confirmPassword) => {
    if(password === confirmPassword){
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        })
        .then( response => response.json())
        .then(user => {
            if(user.id){
                this.userUpdate(user);
                this.communicateHandler("Registration successed!", VARIANT.SUCCESS)
                this.props.history.push("/");
            }
        })
    }else{
      this.communicateHandler("Passwords don't match!", VARIANT.DANGER)
    }
    
}

  render(){
    return (
      <div className="app">
          <NavbarKD 
            signOut={this.signOut}
            user={this.state.user}
          />
          {this.state.message.text ? 
              <Message 
                text={this.state.message.text} 
                variant={this.state.message.variant}
              />
            : 
            null
          }
          <Switch>
            <Route exact path="/" user={this.state.user}  component={HomePage} />
            <Route path="/bookdetails/:id" 
              render={() => (
                <BookDetails user={this.state.user} />
              )}
            />
            <Route path="/register"  
              render={() => (
                <Register userRegister={this.userRegister} />
              )}
            />
            <Route path="/login" 
              render={() => (
                <LogIn 
                  userSignIn={this.userSignIn}
                />)}
            />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
