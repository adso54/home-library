import React from 'react';
import CardKD from '../card/card.component';
import './directory.styles.scss'
import { connect } from 'react-redux'
import {setSearchFieldHidden, setSearchFieldVisable} from '../../redux/search/search.actions'

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
        this.props.setSearchFieldVisable();
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

    componentWillUnmount = () => {
        this.props.setSearchFieldHidden();
    }

    render() {
        const filteredBooks = this.state.books.filter((book)=>{
            let authorFits = false;
            let categoryFits = false;
            let titleFits = false;

            titleFits = book.title.toLowerCase().includes(this.props.searchField);

            book.author.forEach((author) => (
                author.name.toLowerCase().includes(this.props.searchField.toLowerCase()) ? authorFits = true : null
            ))

            book.category.forEach((category) => (
                category.category.toLowerCase().includes(this.props.searchField.toLowerCase()) ? categoryFits = true : null
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

const mapDispatchToProps = dispatch => ({
    setSearchFieldHidden: () => dispatch(setSearchFieldHidden()),
    setSearchFieldVisable: () => dispatch(setSearchFieldVisable()),
})


export default connect(mapStateToProps,mapDispatchToProps)(Directory);