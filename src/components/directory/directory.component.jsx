import React from 'react';
import CardKD from '../card/card.component';
import './directory.styles.scss'

class Directory extends React.Component {
    constructor(props) {
        super();
        this.state = 
        {
            books: [],
            filteredBooks: [],
            user: {
                id: null
            },
            searchField: ''
        }

    }

    componentDidMount = () => {
        this.setState(state => ({
            ...state,
            user: this.props.user,
            searchField: this.props.searchField,
        }))

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

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.searchField !== prevProps.searchField) {
            this.setState((state) => ({
                ...state,
                searchField: this.props.searchField
            }))
        }
    }

    render() {
        const filteredBooks = this.state.books.filter((book)=>{
            let authorFits = false;
            let categoryFits = false;
            let titleFits = false;

            titleFits = book.title.toLowerCase().includes(this.state.searchField);

            book.author.forEach((author) => (
                author.name.toLowerCase().includes(this.state.searchField) ? authorFits = true : null
            ))

            book.category.forEach((category) => (
                category.category.toLowerCase().includes(this.state.searchField) ? categoryFits = true : null
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
                    <div className="noBooks">Pusto</div>
                }
                
            </div>  
        )}
}

export default Directory;