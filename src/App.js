//Libraries
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
//Styles
import './App.css';
//Pages:
import HomePage from './pages/homepage/homepage.component';
import BookDetails from './pages/bookdetails/bookdetails.component';
import Register from './pages/register/register.component'
import LogIn from './pages/login/login.component'
//Components
import NavbarKD from './components/navbar/navbar.component';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null
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
            }
            
        })
    
  }

  render(){
    return (
      <div className="app">
          <NavbarKD 
            signOut={this.signOut}
            user={this.state.user}
          />
          <Switch>
            <Route exact path="/" user={this.state.user}  component={HomePage} />
            <Route path="/bookdetails/:id" user={this.state.user} component={BookDetails} />
            <Route path="/register"  
              render={() => (
                <Register userUpdate = {this.userUpdate} />
              )}
            />
            <Route path="/login" 
              render={() => (
                <LogIn 
                  userUpdate = {this.userUpdate}
                  userSignIn={this.userSignIn}
                />)}
            />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
