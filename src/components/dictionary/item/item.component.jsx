import React from 'react';
import './item.styles.scss';

const selectItem = (id, title) => {
    console.log(id)
    console.log(title)
}

const Item = ({item}) =>{
    return (
        <div className="dictionaryItem" onClick={() => selectItem(item.id, item.title)}>
            {item.title}
        </div>
    )
}

export default Item;