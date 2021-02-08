import { SearchActionTypes } from './search.types'

const INITIAL_STATE = {
    searchField: '',
    searchVisable: false    
}

const searchReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SearchActionTypes.SET_SEARCH_FIELD:
            return {
                ...state,
                searchField: action.payload
            }
        case SearchActionTypes.SHOW_SEARCH_FIELD:
            return {
                ...state,
                searchVisable: true
            }
            case SearchActionTypes.HIDE_SEARCH_FIELD:
        return {
            ...state,
            searchVisable: false
        }
        default:
            return state
    }
}

export default searchReducer