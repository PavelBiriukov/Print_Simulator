import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { textReducer, textTyptedReducer } from './reducers';

const rootReducer = combineReducers({
  text: textReducer,
  typedText: textTyptedReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
