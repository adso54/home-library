import { UserActionTypes } from './user.types'

const INITIAL_STATE =  {
    user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null
    }
};

const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        default: 
            return state
    }
}

export default userReducer;