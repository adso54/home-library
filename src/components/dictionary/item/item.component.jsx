import React from 'react';
import './item.styles.scss';

const Item = ({item}) =>{
    return (
        <div >
            {item.title}
        </div>
    )
}

export default Item;