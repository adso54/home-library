import React from 'react';
import {withRouter} from 'react-router-dom';
import {Form, Col, Image, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bsCustomFileInput from 'bs-custom-file-input';
import VARIANT from '../../assets/communicate-variants.js';
import { uploadImage } from '../../firebase/firebaseUtils.js';
import { connect } from 'react-redux';
import Dictionary from '../../components/dictionary/dictionary.component';

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
            categories: [ 
                {   
                    category: ''  
                },
            ],
            readDate: null, 
            description: '',
            comments: '',
            fileUrl: null,
            file: null,
            userId: null,
            bookId: null,
            booksByTitle: null,
            focus: null,
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
            fetch(process.env.REACT_APP_SERV_ADRESS + '/book/details',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id,
                    bookId: bookId,
                })
            })
            .then(res => res.json())
            .then(book => {
                let readDate = null
                if(book.read_date!==null){
                    readDate = new Date(book.read_date);
                }else{
                    readDate = null;
                }

                this.setState(state =>({
                    ...state,
                    title: book.title,
                    authors: book.author,
                    categories: book.category,
                    description: book.description,
                    comments: book.comments,
                    readDate: readDate,
                    fileUrl: book.image_url,
                }))
            })
            .catch(err => console.log(err))
        }
    }

    componentDidUpdate(){
        if(this.state.bookId && !this.props.match.params.bookId){ 
            this.setState((state) => 
            ({
            ...state,
            bookId: this.props.match.params.bookId,
            }))
        }
      }

    handleCategory = (elementIndex, event) =>{
        const value = event.target.value
        this.setState(state => {
            const categories = state.categories.map((category, categoryIndex)=>{
                if(categoryIndex===elementIndex){
                    return {category: value}
                }else{
                    return {category: category.category}
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
            const authors = state.authors.concat(
                { 
                    name: '', 
                }
            )

            return {authors: authors};
        })
    };

    addCategoryHandler = (e) =>{
        this.setState(state => {
            const categories = state.categories.concat(
                {
                    category: '',
                }
            )
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
                return {categories:[
                    {
                        category: '',
                    }
                ]
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

    fetchTop10ByTitle = (titlePart) => (
        fetch(process.env.REACT_APP_SERV_ADRESS + '/book/getTop10ByTitlePart',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: titlePart
            })
        })
        .then(res => res.json())
        .then(books => {
            this.setState((state) => 
            ({
                ...state,
                booksByTitle: books
            }))
        })
    )  

    handleChange = (e) => {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })

        if(name==='title' ){
            this.fetchTop10ByTitle(value)
        }
    }

    handleDelete = () => {
        fetch(process.env.REACT_APP_SERV_ADRESS + '/book/userBook', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: this.state.userId,
                bookId: this.state.bookId
            })
        })
        .then(res => res.json())
        .then(numberOfDeletedRow => {
            if(numberOfDeletedRow !==null) {
                this.props.communicateHandler('Book successful deleted!', VARIANT.SUCCESS)
            }else{
                this.props.communicateHandler('An error occured!', VARIANT.DANGER)
            }
        })
        .catch(err => console.log(err))
        
    }

    handleSubmit = () => {
        const formData = new FormData();
        formData.append('authors', JSON.stringify(this.state.authors));
        formData.append('categories', JSON.stringify(this.state.categories));
        formData.append('description', this.state.description);
        formData.append('title', this.state.title);
        formData.append('bookId', this.state.bookId);
        formData.append('comments', this.state.comments);
        formData.append('readDate', this.state.readDate);
        formData.append('userId', this.state.userId);

        const submitData = () => {
            fetch(process.env.REACT_APP_SERV_ADRESS + '/book',{
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
            .catch(err => console.log(err))
        }

        if(this.state.file !== null){
            uploadImage(this.state.file)
            .then(imageUrl => formData.append('imageUrl', imageUrl))
            .then(() => {
                submitData();
            })       
        }else{
            formData.append('imageUrl', this.state.fileUrl);
            submitData();
        }

    }

    onFieldFocus = (e) => {
        const name = e.target.name
        this.fetchTop10ByTitle('')
        this.setState(() => ({
            focus: name
        }))
    }

    onFieldBlur = () => {
        setTimeout(()=>{
            this.setState(() => ({
                focus: null
            }))
        },200) 
    }

    render(){
        return(
            <div className="bookdetails">
                <div className="form">
                    <Form >
                        <Form.Group as={Col} controlId="formGridTitle" >
                            <Form.Label className='label' >Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                value={this.state.title} 
                                onChange={this.handleChange} 
                                name="title" 
                                onFocus={(e)=> this.onFieldFocus(e)}
                                onBlur = {this.onFieldBlur}
                            />
                            {this.state.booksByTitle !== null 
                                && this.state.booksByTitle.length > 0 
                                && this.state.focus === 'title'
                            ? <Dictionary items={this.state.booksByTitle}  /> 
                            : null}
                                                  
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
                                        value={category.category} 
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
                            <Form.Control as="textarea" aria-label="Comments" name="description" value={this.state.description} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className='label' >My comments</Form.Label>
                            <Form.Control as="textarea" aria-label="Comments" name="comments" value={this.state.comments} onChange={this.handleChange} />
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
                                        name="readDate"
                                    />
                                }

                            />
                        </Form.Group>    
                       
                        {
                            this.state.bookId ? 
                                <div className="buttons">
                                    <div >
                                        <Button className="button" variant='secondary' onClick={this.handleSubmit} >Edit</Button>
                                    </div>
                                    <div >
                                        <Button className="button" variant='danger' onClick={this.handleDelete} >Delete</Button>
                                    </div>
                                </div>                            
                            :
                                <div className="addButton">
                                    <Button  variant='secondary' onClick={this.handleSubmit} >Add book</Button>
                                </div>
                        }
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

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(withRouter(BookDetails));
