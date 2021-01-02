import React from 'react';

import Directory from '../../components/directory/directory.component'

const HomePage = ({user}) => { 
    return(
        <div className="homepage">
            <Directory user={user}/>
        </div>
    )
}


export default HomePage;