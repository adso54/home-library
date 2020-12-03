import React from 'react';
import {Form, Col, Image} from 'react-bootstrap'

import './bookdetails.styles.scss';

class BookDetails extends React.Component  {
    constructor(props) {
        super();
        this.state = {
            authors: [
                {   
                    firstName: '', 
                    lastName: ''    
                }    
            ]   
        }
    }


    handleFirstNameChange = (elementIndex, event) =>{
        const value = event.target.value
        this.setState(state => {
            const authors = state.authors.map((author, authorIndex)=>{
                if(authorIndex===elementIndex){
                    return {
                        firstName: value, 
                        lastName: author.lastName
                    }
                }else{
                    return {
                        firstName: author.firstName, 
                        lastName: author.lastName
                    }     
                }
            }
            )
            return {authors: authors}
        })         
    }

    handleLastNameChange = (elementIndex, event) =>{
        const value = event.target.value
        this.setState(state => {
            const authors = state.authors.map((author, authorIndex)=>{
                if(authorIndex===elementIndex){
                    return {
                        firstName: author.firstName,
                        lastName: value
                    }
                }else{
                    return {
                        firstName: author.firstName, 
                        lastName: author.lastName
                    }     
                }
            }
            )
            return {authors: authors}
        })         
    }

    addHandler = (e) =>{
        this.setState(state => {
            const authors = state.authors.concat({ 
                firstName: '', 
                lastName: '' 
            })

            return {authors: authors};
        })
    };

    deleteHandler = (deleteIndex, event) => {
        this.setState(state => {
            if(state.authors.length === 1){
                return {authors:[
                        { 
                            firstName: '', 
                            lastName: '' 
                        }
                    ]
            }
            }else{
                const authors = state.authors.filter((author, index) => deleteIndex !== index)
                return {authors: authors}
            }
        })
    }

    render(){
        
        return(
            <div className="bookdetails">
                <div className="form">
                    <Form >
                        <Form.Group as={Col} controlId="formGridTitle" >
                            <Form.Label className='label' >Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label className='label' >Authors</Form.Label>

                            {this.state.authors.map((author, index) =>(
                                <div className="authors" key={index}>
                                    <Form.Control 
                                        id={`firstName ${index}`}
                                        type="text" 
                                        placeholder="First name" 
                                        value={author.firstName} 
                                        onChange={(event) => this.handleFirstNameChange(index,event)}
                                    />
                                    <Form.Control 
                                        id={`lastName ${index}`}
                                        type="text" 
                                        placeholder="Last name" 
                                        value={author.lastName} 
                                        onChange={(event) => this.handleLastNameChange(index,event)}
                                    />
                                    <div className='deleteItem' onClick={(event) => this.deleteHandler(index, event)}>
                                        <i className="far fa-trash-alt"></i>   
                                    </div>
                                </div>
                                
                            ))}

                            <div className='addNew' onClick={this.addHandler}>                     
                                <i className="fas fa-plus"><span> NEW</span></i>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                <div className="rightContainer">
                    <Image className="image" src="https://image.ceneostatic.pl/data/products/528076/i-diuna.jpg" rounded />
                </div>
            </div>
        )}
    };

export default BookDetails;