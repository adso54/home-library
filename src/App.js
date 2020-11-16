import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import BookDetails from './pages/bookdetails/bookdetails.component';
import NavbarKD from './components/navbar/navbar.component'
import { Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <div>
      <NavbarKD/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/bookdetails/:id" component={BookDetails} />
      </Switch>
    </div>
  );
}

export default App;
