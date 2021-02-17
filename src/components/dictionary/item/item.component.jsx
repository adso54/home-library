import React from 'react';
import './item.styles.scss';

const Item = ({item, titleSelected}) =>{
    return (
        <div className="dictionaryItem" onClick={() => titleSelected(item.id)}>
            {item.title}
        </div>
    )
}

export default Item;