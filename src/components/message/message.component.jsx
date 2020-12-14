import React from 'react';
import Alert from 'react-bootstrap/Alert'

import './message.styles.scss';


const Message = ({text, variant})=> {
    return(
        <div >
            <Alert className="message" variant={variant}>
                {text}
            </Alert>
        </div>
    )
}

export default Message;