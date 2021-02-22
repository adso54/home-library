import React from 'react';
import './dictionary.styles.scss';
import Item from './item/item.component';

const Dictionary = ({dictionaryValues, dictionarySelected, index}) =>{
    return(
        <div className="dictionary">
            {dictionaryValues.map((item) => (
                <div key={ item.dictionaryId}  >
                    <Item item={item} dictionarySelected={dictionarySelected} index={index}/>
                </div>
            ))}
            
        </div>
    )
}

export default Dictionary;