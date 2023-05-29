import { SET_TEXT, SET_TEXT_TYPED, TextActionTypes, TextState } from "../types/types";

const initialState: TextState = {
  text: '',
  typedText: ''
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
const textTyptedReducer = (state = initialState, action: TextActionTypes): TextState => {
  switch (action.type) {
    case SET_TEXT_TYPED:
      return {
        ...state,
        typedText: action.payload,
      };
    default:
      return state;
  }
};

export { textReducer, textTyptedReducer };