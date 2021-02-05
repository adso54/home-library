import {messageActionTypes} from './message.types';

const INITIAL_STATE= {
    message:{
        text: null,
        variant: null
    }
}

const messageReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case messageActionTypes.SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default: 
            return state
    }
}

export default messageReducer;