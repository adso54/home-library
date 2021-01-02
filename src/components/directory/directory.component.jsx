import React from 'react';
import CardKD from '../card/card.component'

import './directory.styles.scss'

class Directory extends React.Component {
    constructor(props) {
        super();
        this.state = 
        {
            books: [],
            user: {
                id: null
            },
        }

    }

    componentDidMount = () => {
        this.setState(state => ({
            ...state,
            user: this.props.user
        }))

        fetch('http://localhost:8080/book/allUserBooks',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id
                })
            })
            .then(res => res.json())
            .then(books => {
                this.setState(state =>({
                    ...state,
                    books: books
                }))
            })
            .catch(err => console.log(err))
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