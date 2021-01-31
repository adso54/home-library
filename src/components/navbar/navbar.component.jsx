import {Navbar, Nav, InputGroup, FormControl} from 'react-bootstrap'; //NavDropdown,
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import './navbar.styles.scss'

const NavbarKD = ({signOut, user, searchFieldHandler}) => {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">My Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Link to='/bookdetails' className="navbar-link" >
                                Add book
                            </Link> 
                
                <InputGroup className="mb-3 searchPanel">
                    <InputGroup.Prepend>
                        <InputGroup.Text className='searchIcon'><i className="fas fa-search"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                            className='searchField'
                            placeholder="Search by title, author or category"
                            onChange={searchFieldHandler}
                        />
                </InputGroup>

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


export default NavbarKD;