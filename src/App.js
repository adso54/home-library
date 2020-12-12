//Libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom'
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
  constructor(){
    super()
    this.state = {}
  }

  userUpdate = (user) => {
    this.setState= ({user: user})
  }

  signOut = () => {
    this.setState = ({
      user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null
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
                <Register userUpdate = {this.userUpdate}/>
              )}
            />
            <Route path="/login" component= {LogIn} 
              userUpdate = {this.userUpdate}
            />
          </Switch>
      </div>
    );
  }
}

export default App;
