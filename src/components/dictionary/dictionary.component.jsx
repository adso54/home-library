import React from 'react';
import './dictionary.styles.scss';
import Item from './item/item.component';

const Dictionary = ({dictionaryValues, dictionarySelected}) =>{
    return(
        <div className="dictionary">
            {dictionaryValues.map((item) => (
                <div key={item.dictionaryId}  >
                    <Item item={item} dictionarySelected={dictionarySelected}/>
                </div>
            ))}
            
        </div>
    )
}

export default Dictionary;