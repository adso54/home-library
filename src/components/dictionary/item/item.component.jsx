import React from 'react';
import './item.styles.scss';

const Item = ({item, dictionarySelected}) =>{
    return (
        <div className="dictionaryItem" onClick={() => dictionarySelected(item)}>
            {item.dictionaryValue}
        </div>
    )
}

export default Item;