import {SearchActionTypes} from './search.types'

export const setSearchField = searchField => ({
    type: SearchActionTypes.SET_SEARCH_FIELD,
    payload: searchField
})

export const setSearchFieldVisable = () => ({
    type: SearchActionTypes.SHOW_SEARCH_FIELD
})

export const setSearchFieldHidden = () => ({
    type: SearchActionTypes.HIDE_SEARCH_FIELD
})