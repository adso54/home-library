//Libraries
import React from 'react';
import { Switch, Route, generatePath } from 'react-router-dom'
//Styles
import './App.css';
//Pages:
import HomePage from './pages/homepage/homepage.component';
import BookDetails from './pages/bookdetails/bookdetails.component';
import Register from './pages/register/register.component'
import LogIn from './pages/login/login.component'
//Components
import NavbarKD from './components/navbar/navbar.component'

class App extends React.Component {
  constructor(){
    super()
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
    this.setState= ({user: user})
  }


  render(){
    generatePath("/login")
    return (
      <div className="app">
        <NavbarKD user={this.state.user}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/bookdetails/:id" component={BookDetails} />
          <Route path="/register" component= {Register} userUpdate = {this.userUpdate}/>
          <Route path="/login" component= {LogIn} userUpdate = {this.userUpdate}/>
        </Switch>
      </div>
    );
  }
}

export default App;
