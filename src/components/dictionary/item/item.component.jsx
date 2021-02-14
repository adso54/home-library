import React from 'react';
import './item.styles.scss';

const selectItem = (e) => {
    console.log(e.target.innerHTML)
}

const Item = ({item}) =>{
    return (
        <div className="dictionaryItem" onClick={(e) => selectItem(e)} >
            {item.title}
        </div>
    )
}

export default Item;