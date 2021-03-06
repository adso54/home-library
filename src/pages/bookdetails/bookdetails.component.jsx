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
            bookId: null,
            titleDictionaryValues: null,
            authorDictionaryValues: null,
            categoryDictionaryValues: null,
            focus: null,
            userHasBook: false
        }
    }

    fetchBookById = (bookId) => {
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
            console.log(book)
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
                description: (book.description ? book.description : ''),
                comments: (book.comments ? book.comments : ''),
                readDate: readDate,
                fileUrl: book.image_url,
                bookId: book.id,
                userHasBook: (book.user_id ? true : false),
            }))
        })
        .catch(err => console.log(err))
    }
    

    componentDidMount = () => {
        bsCustomFileInput.init();
        const bookId = this.props.match.params.bookId;
        if(bookId) {
            this.fetchBookById(bookId)
        }

        this.fetchTop10ByTitle('');
        this.fetchTop10ByAuthor('');
        this.fetchTop10ByCategory('');
    }


    handleCategory = (elementIndex, value) =>{
        this.setState(state => {
            const categories = state.categories.map((category, categoryIndex)=>{
                if(categoryIndex===elementIndex){
                    return {category: value}
                }else{
                    return {category: category.category}
                }
            }
            )
            this.fetchTop10ByCategory(value);
            return {categories: categories}
        })         
    }

    handleNameChange = (elementIndex, value) =>{
        // const value = event.target.value
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
            this.fetchTop10ByAuthor(value);
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
            const titleDictionaryValues = books.map((book) => ({
                    dictionaryId: book.id, 
                    dictionaryValue: book.title
                }
            ))
            this.setState((state) => 
            ({
                ...state,
                titleDictionaryValues: titleDictionaryValues
            }))
        })
    )  

    fetchTop10ByAuthor = (authorPart) => (
        fetch(process.env.REACT_APP_SERV_ADRESS + '/author/getTop10ByName',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: authorPart
            })
        })
        .then(res => res.json())
        .then(authors => {
            const authorDictionaryValues = authors.map((author) => ({
                    dictionaryId: author.id, 
                    dictionaryValue: author.name
                }
            ))
            this.setState((state) => 
            ({
                ...state,
                authorDictionaryValues: authorDictionaryValues
            }))
        })
    )  

    fetchTop10ByCategory = (categoryPart) => (
        fetch(process.env.REACT_APP_SERV_ADRESS + '/category/getTop10ByCategoryPart',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                category: categoryPart
            })
        })
        .then(res => res.json())
        .then(categories => {
            const categoryDictionaryValues = categories.map((category) => ({
                    dictionaryId: category.id, 
                    dictionaryValue: category.category
                }
            ))
            this.setState((state) => 
            ({
                ...state,
                categoryDictionaryValues: categoryDictionaryValues
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
                userId: this.props.user.id,
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
        formData.append('userId', this.props.user.id);

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

    titleSelected = (item) => {
        if(item.dictionaryId){
            this.fetchBookById(item.dictionaryId) 
        }   
    }

    authorSelected = (item, index) => {
        this.handleNameChange(index, item.dictionaryValue)
    }

    categorySelected = (item, index) => {
        this.handleCategory(index, item.dictionaryValue)
    }

    render(){
        return(
            <div >
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
                                {this.state.titleDictionaryValues !== null 
                                    && this.state.titleDictionaryValues.length > 0 
                                    && this.state.focus === 'title'
                                ? <Dictionary dictionaryValues={this.state.titleDictionaryValues} dictionarySelected={this.titleSelected} /> 
                                : null}
                                                    
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label className='label' >Authors</Form.Label>

                                {this.state.authors.map((author, index) =>(
                                    <div key={index}>
                                        <div className="authors">
                                            <Form.Control 
                                                id={`name ${index}`}
                                                type="text" 
                                                placeholder="Name" 
                                                value={author.name} 
                                                name={`name ${index}`}
                                                onChange={(event) => this.handleNameChange(index,event.target.value)}
                                                onFocus={(e)=> this.onFieldFocus(e)}
                                                onBlur = {this.onFieldBlur}
                                            />
                                            <div className='deleteItem' onClick={(event) => this.deleteAuthorHandler(index, event)}>
                                                <i className="far fa-trash-alt"></i>   
                                            </div>                                    
                                        </div>
                                        {this.state.authorDictionaryValues !== null 
                                            && this.state.authorDictionaryValues.length > 0 
                                            && this.state.focus === `name ${index}`
                                        ? <Dictionary dictionaryValues={this.state.authorDictionaryValues} dictionarySelected={this.authorSelected} index = {index}/> 
                                        : null}   
                                    </div>
                                ))}
                                <div className='addNew' onClick={this.addAuthorHandler}>                     
                                    <i className="fas fa-plus"><span> NEW</span></i>
                                </div>
                            </Form.Group>
                        
                            <Form.Group as={Col} >
                                <Form.Label className='label' >Categories</Form.Label>

                                {this.state.categories.map((category, index) =>(
                                    <div key={index}>
                                        <div className="authors" >
                                            <Form.Control 
                                                id={`category ${index}`}
                                                type="text" 
                                                placeholder="Category" 
                                                value={category.category} 
                                                onChange={(event) => this.handleCategory(index, event.target.value)}
                                                name={`category ${index}`}
                                                onFocus={(e)=> this.onFieldFocus(e)}
                                                onBlur = {this.onFieldBlur}
                                            />
                                            <div 
                                                className='deleteItem' 
                                                onClick={(event) => this.deleteCategoryHandler(index, event)}
                                            >
                                                <i className="far fa-trash-alt"></i>   
                                            </div>
                                        </div>            
                                        {this.state.categoryDictionaryValues !== null 
                                            && this.state.categoryDictionaryValues.length > 0 
                                            && this.state.focus === `category ${index}`
                                        ? <Dictionary dictionaryValues={this.state.categoryDictionaryValues} dictionarySelected={this.categorySelected} index = {index}/> 
                                        : null}  
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
                <div className="buttons">
                    {this.state.userHasBook ? 
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
                </div>
            </div>
        )}
    };

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(withRouter(BookDetails));
