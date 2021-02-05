//Libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
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
//redux
import { setCurrentUser } from './redux/user/user.actions';
import { setSearchField } from './redux/search/search.actions';
import { setMessage} from './redux/message/message.actions';

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      message: {
        text: null,
        variant: null
      }
    }
  }

  userUpdate = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user))
    this.props.setCurrentUser(
      { 
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
      }
    ) 
  }

  signOut = () => {
    window.localStorage.setItem('user', null)
    this.props.setCurrentUser(
      {
          id: null,
          email: null,
          firstName: null,
          lastName: null
      }
    )
  }

  communicateHandler = (text, variant) =>{ 
    this.props.setMessage({
        text: text,
        variant: variant
      }
    )
    setTimeout(()=> {
      this.props.setMessage({
        text: null,
        variant: null
      }
    )
    }, 3000) 
  }
  

  userSignIn = (email, password) => {
    fetch(process.env.REACT_APP_SERV_ADRESS + '/user/signIn', {
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
              this.communicateHandler("Login successed!", VARIANT.SUCCESS)       
              this.props.history.push("/");
            }else{
              this.communicateHandler("Bad credentials!", VARIANT.DANGER)
            }
        })
        .catch(err=>console.error(err))
  }

  userRegister = (firstName, lastName, email, password, confirmPassword) => {
    if(password === confirmPassword){
      fetch(process.env.REACT_APP_SERV_ADRESS + '/user/register', {
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
      .catch(err=>console.error(err))
    }else{
      this.communicateHandler("Passwords don't match!", VARIANT.DANGER)
    }  
  }

  componentDidMount(){
    let user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
      this.userUpdate(user)
    }
  }

  searchFieldHandler = (event) =>{
    this.props.setSearchField(event.target.value)
  }


  render(){
   
    return (
      <div className="app">
          <NavbarKD 
            signOut={this.signOut}
            searchFieldHandler={this.searchFieldHandler}
          />
          {this.props.message.text ? 
              <Message />
            : 
            null
          }
          {this.props.user.id ?
            <Switch>
              <Route exact path="/" 
                render={() => (
                  <HomePage />
                )}
               />
              <Route path="/bookdetails/:bookId" 
                render={() => (
                  <BookDetails 
                    communicateHandler={(text, variant) => this.communicateHandler(text, variant)}/>
                )}
              />
              <Route path="/bookdetails" 
                render={() => (
                  <BookDetails 
                    communicateHandler={(text, variant) => this.communicateHandler(text, variant)}/>
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
          :
          <Switch>
            <Route path="/register"  
                render={() => (
                  <Register userRegister={this.userRegister} />
                )}
              />
              <Route path="/login" 
                render={() => 
                    (<LogIn 
                      userSignIn={this.userSignIn}
                    />)
                }
              />
               <Route  path="/" 
                render={() => (
                  <LogIn 
                    userSignIn={this.userSignIn}
                  />)}
               />
          </Switch>
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  searchField: state.search.searchField,
  message: state.message.message
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setSearchField: searchField => dispatch(setSearchField(searchField)),
  setMessage: message => dispatch(setMessage(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
