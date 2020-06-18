// Redux modules and methods
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Asyncronous action creators
import thunk from 'redux-thunk';
// import {createLogger} from 'redux-logger';

// Import all redux states from their respective modules
import appReducer from './reducer.js';

// const logger = createLogger()

// Combine the different redux states to one
const rootReducer = combineReducers({
    app: appReducer,
});

// create a single store, this store will be provided to the top level react component
const store = createStore(rootReducer, applyMiddleware( thunk));
export default store;