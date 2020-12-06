import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './card.styles.scss'

const CardKD = ({book}) => {
    const {id, title, imgUrl, authors, categories} = book;
    let authorsInLine = ''
    let categoriesInLine =''
    authors.forEach(author =>(
        authorsInLine ? authorsInLine += ', ' + author : authorsInLine = author
    ))
    categories.forEach(category =>(
        categoriesInLine ? categoriesInLine += ', ' + category : categoriesInLine = category
    ))
    return(
    <Card 
    bg={'dark'}
    key={'1'}
    text={'white'}
    className=" card"
    >
       <Card.Img variant="top" src={imgUrl} className = "image" />
       <Card.Body>
           <Card.Title>{title}</Card.Title>
            <Card.Header>{authorsInLine}</Card.Header>
            <Card.Footer>{categoriesInLine}</Card.Footer>
            <Link to={`/bookdetails/${id}`} book={book}><Button variant="primary">Details</Button></Link>
       </Card.Body>
   </Card>
)}

export default CardKD