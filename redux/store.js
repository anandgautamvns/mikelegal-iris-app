import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducerWrapper from './reducers';
 
const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducerWrapper,
    initialState,
    applyMiddleware(...middleware)
);

export default store;