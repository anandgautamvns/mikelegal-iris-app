import { combineReducers } from 'redux';

import signIn from './signIn';
import report from './report';

const rootReducer = combineReducers({
    signIn, 
    report
});

const rootReducerWrapper = (state, action) => {
  return rootReducer(state, action);
};

export default rootReducerWrapper; 