import React from 'react';
import {Form, Col, Image} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

import './bookdetails.styles.scss';

const BookDetails = (book) => (
    <div className="bookdetails">
        <div className="form">
            <Form >
                <Form.Group as={Col} controlId="formGridTitle" >
                    <Form.Label >Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" />
                </Form.Group>
            
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <td className="lastCol"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Form.Control type="text" placeholder="Enter first name" value="Kamil"/></td>
                        <td><Form.Control type="text" placeholder="Enter last name" value="Danielski"/></td>
                        <td className="lastCol">X</td>
                    </tr>
                    <tr>
                        <td><Form.Control type="text" placeholder="Enter first name" value="Kamil"/></td>
                        <td><Form.Control type="text" placeholder="Enter last name" value="Danielski"/></td>
                        <td className="lastCol">X</td>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td className="addRow lastCol">+Add</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Type</th>
                        <td className="lastCol"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Form.Control type="text" placeholder="Enter first name" value="Kamil"/></td>
                        <td className="lastCol">X</td>
                    </tr>
                    <tr>
                        <td><Form.Control type="text" placeholder="Enter first name" value="Kamil"/></td>
                        <td className="lastCol">X</td>
                    </tr>
                    <tr>
                        <td colSpan="1"></td>
                        <td className="addRow lastCol">+Add</td>
                    </tr>
                </tbody>
            </Table>
            </Form>
        </div>
        <div className="rightContainer">
            <Image className="image" src="https://image.ceneostatic.pl/data/products/528076/i-diuna.jpg" rounded />
        </div>
    </div>

)

export default BookDetails;