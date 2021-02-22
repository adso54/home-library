import React from 'react';
import './item.styles.scss';

const Item = ({item, dictionarySelected, index}) =>{
    return (
        <div className="dictionaryItem" onClick={() => dictionarySelected(item, index)}>
            {item.dictionaryValue}
        </div>
    )
}

export default Item;