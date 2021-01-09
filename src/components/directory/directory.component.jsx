import React from 'react';
import CardKD from '../card/card.component';
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

        fetch(process.env.REACT_APP_SERV_ADRESS + '/book/allUserBooks',{
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
                {(this.state.books.length > 0 )? 
                    this.state.books.map((book) =>(
                        <CardKD key={book.id} book={book} />
                    ))
                    :
                    <div className="noBooks">Pusto</div>
                }
                
            </div>  
        )}
}

export default Directory;