import {SearchActionTypes} from './search.types'

export const setSearchField = searchField => ({
    type: SearchActionTypes.SET_SEARCH_FIELD,
    payload: searchField
})