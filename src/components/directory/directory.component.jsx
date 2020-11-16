import React from 'react';
import CardKD from '../card/card.component'

import './directory.styles.scss'

class Directory extends React.Component {
    constructor(props) {
        super();
        this.state = 
        {
            books: [
                {
                    id: '1', 
                    title: 'Diuna',
                    imgUrl: 'https://ecsmedia.pl/c/diuna-kroniki-diuny-tom-1-b-iext39316262.jpg',
                    authors: ['Frank Herbert'],
                    types: ['Science-fiction']
                },
                {
                    id: '2', 
                    title: 'Mesjarz Diuny',
                    imgUrl: 'https://image.ceneostatic.pl/data/products/655541/i-mesjasz-diuny.jpg',
                    authors: ['Frank Herbert'],
                    types: ['Science-fiction']
                },
                {
                    id: '3', 
                    title: 'Dzieci Diuny',
                    imgUrl: 'https://image.ceneostatic.pl/data/products/91218855/i-dzieci-diuny.jpg',
                    authors: ['Frank Herbert'],
                    types: ['Science-fiction']
                },
                {
                    id: '4', 
                    title: 'Bóg Imperator Diuny',
                    imgUrl: 'https://ecsmedia.pl/c/bog-imperator-diuny-kroniki-diuny-tom-4-b-iext43248954.jpg',
                    authors: ['Frank Herbert'],
                    types: ['Science-fiction']
                },
                {
                    id: '5', 
                    title: 'Solaris',
                    imgUrl: 'https://cdn-lubimyczytac.pl/upload/books/133000/133717/352x500.jpg',
                    authors: ['Stanisław Lem'],
                    types: ['Science-fiction']
                },
                {
                    id: '6', 
                    title: 'Bajki Robotów',
                    imgUrl: 'https://ecsmedia.pl/c/bajki-robotow-b-iext34522977.jpg',
                    authors: ['Stanisław Lem'],
                    types: ['Science-fiction']
                },
                {
                    id: '7', 
                    title: 'Mały Książe',
                    imgUrl: 'https://image.ceneostatic.pl/data/products/179587/i-maly-ksiaze.jpg',
                    authors: ['Antoine De Saint-Expuery'],
                    types: ['Fantasy']
                }  
            ]
        }
    }
    render() {
        return(
            <div className = "directory">
                {this.state.books.map((book) =>(
                    <CardKD key={book.id} book={book} />
                ))}
            </div>  
        )}
}

export default Directory;