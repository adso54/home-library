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
import NavbarKD from './components/navbar/navbar.component'

function App() {
  return (
    <div className="app">
      <NavbarKD/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/bookdetails/:id" component={BookDetails} />
        <Route path="/register" component= {Register} />
        <Route path="/login" component= {LogIn} />
      </Switch>
    </div>
  );
}

export default App;
