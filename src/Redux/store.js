import { createStore, combineReducers } from 'redux';
import {authentication} from './_reducers/authentication.reducer'

export const store = createStore(
    combineReducers({authentication : authentication})
    /*,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )*/
);
