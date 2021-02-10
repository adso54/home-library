import React from 'react';
import './dictionary.styles.scss';
import Item from './item/item.component';

const Dictionary = ({items}) =>{
    return(
        <div>
            {items.map((item) => (
                <div key={item.id} >
                    <Item item={item}/>
                </div>
            ))}
            
        </div>
    )
}

export default Dictionary;