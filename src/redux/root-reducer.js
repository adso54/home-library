import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import searchReducer from './search/search.reducer';
import messageReducer from './message/message.reducer';
import searchVisableReducer from './search/search.reducer';

export default combineReducers({
    user: userReducer, 
    search: searchReducer,
    message: messageReducer, 
    searchVisable: searchVisableReducer
});

