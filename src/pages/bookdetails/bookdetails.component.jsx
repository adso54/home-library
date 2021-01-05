import React from 'react';
import {withRouter} from 'react-router-dom';
import {Form, Col, Image, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bsCustomFileInput from 'bs-custom-file-input';
import VARIANT from '../../assets/communicate-variants.js';


import './bookdetails.styles.scss';

class BookDetails extends React.Component  {
    constructor() {
        super();
        this.state = {
            title: '',
            authors: [
                {   
                    name: ''  
                },
            ],
            categories: [''],
            readDate: new Date(), 
            description: '',
            comments: '',
            fileUrl: null,
            file: null,
            userId: null,
            bookId: null     
        }
    }

    componentDidMount = () => {
        bsCustomFileInput.init();
        const bookId = this.props.match.params.bookId;
        this.setState((state) => 
           ({
            ...state,
            userId: this.props.user.id,
            bookId: bookId,
        }))
        
        if(bookId) {
            fetch('http://localhost:8080/book/details',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id,
                    bookId: bookId,
                })
            })
            .then(res => res.json())
            .then(book => {
                const category = book.category.map((category) => {
                    return category.category
                })

                this.setState(state =>({
                    ...state,
                    title: book.title,
                    authors: book.author,
                    categories: category,
                    description: book.description,
                    comments: book.comments,
                    readDate: new Date(book.read_date),
                    fileUrl: 'http://localhost:8080/' + book.image_url,
                }))
            })
            .catch(err => console.log(err))
        }
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

    handleNameChange = (elementIndex, event) =>{
        const value = event.target.value
        this.setState(state => {
            const authors = state.authors.map((author, authorIndex)=>{
                if(authorIndex===elementIndex){
                    return {
                        name: value,
                    }
                }else{
                    return {
                        name: author.name, 
                    }     
                }
            }
            )
            return {authors: authors}
        })         
    }

    handleReadDateChange = (date) =>{
        this.setState({readDate: date})
    }

    addAuthorHandler = (e) =>{
        this.setState(state => {
            const authors = state.authors.concat({ 
                name: '', 
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
                            name: '',
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
        let fileInput = e.target.files[0];
            this.setState({
                file: fileInput,
                fileUrl: URL.createObjectURL(fileInput)
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
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('authors', JSON.stringify(this.state.authors));
            formData.append('categories', JSON.stringify(this.state.categories));
            formData.append('description', this.state.description);
            formData.append('title', this.state.title);
            formData.append('comments', this.state.comments);
            formData.append('readDate', this.state.readDate);
            formData.append('userId', this.state.userId);

            fetch('http://localhost:8080/book',{
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(bookId => {
                if(bookId !==null) {
                    this.props.communicateHandler('Book successful added!', VARIANT.SUCCESS)
                }else{
                    this.props.communicateHandler('An error occured!', VARIANT.DANGER)
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
                            <Form.Control type="text" placeholder="Enter title" value={this.state.title} onChange={this.handleTitle} />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label className='label' >Authors</Form.Label>

                            {this.state.authors.map((author, index) =>(
                                <div className="authors" key={index}>
                                    <Form.Control 
                                        id={`name ${index}`}
                                        type="text" 
                                        placeholder="Name" 
                                        value={author.name} 
                                        onChange={(event) => this.handleNameChange(index,event)}
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
                                        id={`name ${index}`}
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
                                selected={this.state.readDate} 
                                onChange={date => this.handleReadDateChange(date)}
                                dateFormat="yyyy-MM-dd"
                                customInput={ 
                                    <Form.Control 
                                        id='readDate'
                                        type="text" 
                                        value={this.state.readDate}
                                    />
                                }

                            />
                        </Form.Group>
                        <div className="addButton">
                            <Button variant='secondary' onClick={this.handleSubmit} >Add book</Button>
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
