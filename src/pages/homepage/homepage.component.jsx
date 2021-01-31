import React from 'react';

import Directory from '../../components/directory/directory.component'

const HomePage = ({user, searchField}) => { 
    return(
        <div className="homepage">
            <Directory user={user} searchField={searchField}/>
        </div>
    )
}


export default HomePage;