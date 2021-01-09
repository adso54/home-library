import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './card.styles.scss'

const CardKD = ({book}) => {
    const {id, title, image_url, author, category} = book;
    const imageURL = process.env.REACT_APP_SERV_ADRESS + '/' + image_url
    let authorsInLine = ''
    let categoriesInLine =''
    if(author){
        author.forEach(author =>(
            authorsInLine ? authorsInLine += ', ' + author.name : authorsInLine = author.name
        ))
    }
    if(category){
        category.forEach(category =>(
            categoriesInLine ? categoriesInLine += ', ' + category.category : categoriesInLine = category.category
        ))
    }
    return(
    <Card 
    bg={'dark'}
    key={'1'}
    text={'white'}
    className=" card"
    >
       <Card.Img variant="top" src={imageURL} className = "image" />
       <Card.Body>
           <Card.Title>{title}</Card.Title>
            <Card.Header>{authorsInLine}</Card.Header>
            <Card.Footer>{categoriesInLine}</Card.Footer>
            <Link to={`/bookdetails/${id}`} book={book}><Button variant="primary">Details</Button></Link>
       </Card.Body>
   </Card>
)}

export default CardKD