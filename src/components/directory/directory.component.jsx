import React from 'react';
import CardKD from '../card/card.component';
import './directory.styles.scss'
import { connect } from 'react-redux'

class Directory extends React.Component {
    constructor(props) {
        super();
        this.state = 
        {
            books: [],
            filteredBooks: [],
        }
    }

    componentDidMount = () => {

        fetch(process.env.REACT_APP_SERV_ADRESS + '/book/allUserBooks',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id
                })
            })
            .then(res => {
                if(res.status===200){
                    return res.json()
                }else{ 
                    console.log(res)
                    return null
                }
            })
            .then(books => {
                this.setState(state =>({
                    ...state,
                    books: books
                }))
            })
            .catch(err => console.log(err))
    }

    render() {
        const filteredBooks = this.state.books.filter((book)=>{
            let authorFits = false;
            let categoryFits = false;
            let titleFits = false;

            titleFits = book.title.toLowerCase().includes(this.props.searchField);

            book.author.forEach((author) => (
                author.name.toLowerCase().includes(this.props.searchField) ? authorFits = true : null
            ))

            book.category.forEach((category) => (
                category.category.toLowerCase().includes(this.props.searchField) ? categoryFits = true : null
            ))

            return titleFits || authorFits || categoryFits
        })

        return(
            <div className = "directory">
                {(filteredBooks.length > 0 )? 
                    filteredBooks.map((book) =>(
                        <CardKD key={book.id} book={book} />
                    ))
                    :
                    <div className="noBooks">Brak książek</div>
                }
            </div>  
        )}
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    searchField: state.search.searchField
})

export default connect(mapStateToProps)(Directory);