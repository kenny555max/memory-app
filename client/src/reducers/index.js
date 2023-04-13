import { combineReducers } from "redux";
import posts from './post';
import users from './user';

export default combineReducers({
    posts,
    users
});