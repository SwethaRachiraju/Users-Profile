import { combineReducers } from 'redux';
import userReducer from '../components/store/users.reducer';

const reducer = combineReducers({
    user: userReducer
});

export default reducer;