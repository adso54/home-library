import React from 'react';
import Alert from 'react-bootstrap/Alert'
import {connect} from 'react-redux'

import './message.styles.scss';


const Message = ({message})=> {
    return(
        <div >
            <Alert className="message" variant={message.variant}>
                {message.text}
            </Alert>
        </div>
    )
}

const mapStateToProps = state => ({
    message: state.message.message
})

export default connect(mapStateToProps)(Message);