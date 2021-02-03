import React from 'react';
import { connect } from 'react-redux';

import Directory from '../../components/directory/directory.component'

const HomePage = ({user, searchField}) => { 
    
    return(
        <div className="homepage">
            <Directory user={user} searchField={searchField} />
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps)(HomePage);
