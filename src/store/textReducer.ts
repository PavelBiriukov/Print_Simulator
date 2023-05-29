import { combineReducers } from 'redux';
import { SET_TEXT, TextActionTypes } from '../types/types';

export interface TextState {
  text: string;
  typedText: string;
  userInput: string;
}

const initialState: TextState = {
  typedText: '',
  text: '',
  userInput: '',
};

const textReducer = (state = initialState, action: TextActionTypes): TextState => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  text: textReducer,
});
