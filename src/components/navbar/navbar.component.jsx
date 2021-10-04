import {Navbar, Nav, InputGroup, FormControl} from 'react-bootstrap'; //NavDropdown,
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { connect } from 'react-redux';
import {setSearchField} from '../../redux/search/search.actions'

import './navbar.styles.scss'

const NavbarKD = ({signOut, user, setSearchField, searchVisable}) => {
    
    return(
        <Navbar className ='ml_navbar'  collapseOnSelect expand="lg" bg="dark" variant="dark">      
            <Navbar.Brand href="#home">
            <img
                src="/android-chrome-512x512.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Navbar.Brand href="/" className='ml_navbarMobile'>My Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Link to='/bookdetails' className="navbar-link" >
                                Add book
                            </Link> 
                {searchVisable ? 
                    <InputGroup className="mb-3 searchPanel" >
                        <InputGroup.Prepend>
                            <InputGroup.Text className='searchIcon'><i className="fas fa-search"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                                className='searchField'
                                placeholder="Search by title, author or category"
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                    </InputGroup>
                : null }
               

                </Nav>
            <Nav >
                {user.id ? 
                    <Nav.Link onClick={signOut} >
                        Sign out
                    </Nav.Link>
                :
                    <div >
                            <Link to='/login' className="navbar-link" >
                                Login
                            </Link> 
                            <Link to='/register' className="navbar-link"  >
                                Register
                            </Link>
                    </div>
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
)}

const mapStateToProps = state => ({
    user: state.user.user,
    searchField: state.search.searchField,
    searchVisable: state.searchVisable.searchVisable
})

const mapDispatchToProps = dispatch =>({
    setSearchField: searchField => dispatch(setSearchField(searchField)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarKD);