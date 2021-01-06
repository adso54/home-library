import {Navbar, Nav} from 'react-bootstrap'; //NavDropdown,
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import './navbar.styles.scss'

const NavbarKD = ({signOut, user}) => {

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">My Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Link to='/bookdetails' className="navbar-link" >
                                Add book
                            </Link> 
                {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
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