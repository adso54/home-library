import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './card.styles.scss'

const CardKD = ({book}) => {
    const {id, title, imgUrl, authors, types} = book;
    let authorsInLine = ''
    let typesInLine =''
    authors.forEach(author =>(
        authorsInLine ? authorsInLine += ', ' + author : authorsInLine = author
    ))
    types.forEach(type =>(
        typesInLine ? typesInLine += ', ' + type : typesInLine = type
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
            <Card.Footer>{typesInLine}</Card.Footer>
            <Link to={`/bookdetails/${id}`}><Button variant="primary">Details</Button></Link>
       </Card.Body>
   </Card>
)}

export default CardKD