import React from 'react';
import {withRouter} from 'react-router-dom';
import {Form, Col, Image, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bsCustomFileInput from 'bs-custom-file-input'


import './bookdetails.styles.scss';

class BookDetails extends React.Component  {
    constructor() {
        super();
        this.state = {
            title: '',
            authors: [
                {   
                    firstName: '', 
                    lastName: ''    
                },
            ],
            categories: [''],
            startDate: new Date(), 
            description: '',
            comments: '',
            fileUrl: null,
            file: null     
        }
    
        
    }

    componentDidMount = () => {
        bsCustomFileInput.init();
    }

    handleCategory = (elementIndex, event) =>{
        const value = event.target.value
        this.setState(state => {
            const categories = state.categories.map((category, categoryIndex)=>{
                if(categoryIndex===elementIndex){
                    return value
                }else{
                    return category
                }
            }
            )
            return {categories: categories}
        })         
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

    handleStartDateChange = (date) =>{
        this.setState({startDate: date})
    }

    addAuthorHandler = (e) =>{
        this.setState(state => {
            const authors = state.authors.concat({ 
                firstName: '', 
                lastName: '' 
            })

            return {authors: authors};
        })
    };

    addCategoryHandler = (e) =>{
        this.setState(state => {
            const categories = state.categories.concat('')
            return {categories: categories};
        })
    };

    deleteAuthorHandler = (deleteIndex, event) => {
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

    deleteCategoryHandler = (deleteIndex, event) => {
        this.setState(state => {
            if(state.categories.length === 1){
                return {categories:['']
            }
            }else{
                const categories = state.categories.filter((category, index) => deleteIndex !== index)
                return {categories: categories}
            }
        })
    }

    handleImageChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileUrl: URL.createObjectURL(e.target.files[0])
          })
    }

    handleComments = (e) =>{
        this.setState({
            comments: e.target.value
        })
    }

    handleTitle = (e) =>{
        this.setState({
            title: e.target.value
        })
    }

    handleDescription = (e) =>{
        this.setState({
            description: e.target.value
        })
    }

    handleSubmit = () => {
            console.log(this.state.file)
            fetch('http://localhost:8080/book', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: this.state.title,
                    image: this.state.file
                })
            })
                .then( response => response.json())
                .then(book => {
                    console.log(book)
                    // if(user.id){
                    //   this.userUpdate(user);   
                    //   this.communicateHandler("Login successed!", VARIANT.SUCCESS)       
                    //   this.props.history.push("/");
                    // }else{
                    //   this.communicateHandler("Bad credentials!", VARIANT.DANGER)
                    // }
            })
    }

    handleGet= () => {
        fetch('http://localhost:8080/book', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: '4'
            })
        })
            .then( response => response.json())
            .then(book => {
                this.setState( state => ({
                    ...state,
                    file: book.image
                }))
                this.setState( state => ({
                    ...state,
                    fileUrl: URL.createObjectURL(book.image)
                }))
        })
}

    render(){
        return(
            <div className="bookdetails">
                <div className="form">
                    <Form >
                        <Form.Group as={Col} controlId="formGridTitle" >
                            <Form.Label className='label' >Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={this.state.title} onChange={this.handleTitle} />
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
                                    <div className='deleteItem' onClick={(event) => this.deleteAuthorHandler(index, event)}>
                                        <i className="far fa-trash-alt"></i>   
                                    </div>
                                </div>
                                
                            ))}

                            <div className='addNew' onClick={this.addAuthorHandler}>                     
                                <i className="fas fa-plus"><span> NEW</span></i>
                            </div>
                        </Form.Group>
                     
                        <Form.Group as={Col} >
                            <Form.Label className='label' >Categories</Form.Label>

                            {this.state.categories.map((category, index) =>(
                                <div className="authors" key={index}>
                                    <Form.Control 
                                        id={`firstName ${index}`}
                                        type="text" 
                                        placeholder="Category" 
                                        value={category} 
                                        onChange={(event) => this.handleCategory(index,event)}
                                    />
                                    <div 
                                        className='deleteItem' 
                                        onClick={(event) => this.deleteCategoryHandler(index, event)}
                                    >
                                        <i className="far fa-trash-alt"></i>   
                                    </div>
                                </div>            
                            ))}

                            <div className='addNew' onClick={this.addCategoryHandler}>                     
                                <i className="fas fa-plus"><span> NEW</span></i>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className='label' >Description</Form.Label>
                            <Form.Control as="textarea" aria-label="Comments" value={this.state.description} onChange={this.handleDescription}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className='label' >My comments</Form.Label>
                            <Form.Control as="textarea" aria-label="Comments" value={this.state.comments} onChange={this.handleComments} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className='label' >Read date </Form.Label>
                            <DatePicker 
                                className='datepicker'
                                selected={this.state.startDate} 
                                onChange={date => this.handleStartDateChange(date)}
                                dateFormat="yyyy-MM-dd"
                                customInput={ 
                                    <Form.Control 
                                        id='readDate'
                                        type="text" 
                                        value={this.state.startDate}
                                    />
                                }

                            />
                        </Form.Group>
                        <div className="addButton">
                            <Button variant='success' onClick={this.handleSubmit} >Add book</Button>
                            <Button variant='success' onClick={this.handleGet} >Get book</Button>
                        </div>
                    </Form>
                </div>
                <div className="rightContainer">
                    <Image className="image" src={this.state.fileUrl} rounded />
                    <Form.File 
                        id="custom-file"
                        label="Custom file input"
                        custom
                        onChange={this.handleImageChange}
                    />
                </div>
                
            </div>
        )}
    };

export default withRouter(BookDetails);
