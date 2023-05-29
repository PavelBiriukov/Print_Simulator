import { SET_TEXT, SET_TEXT_TYPED, TextActionTypes } from "../types/types";

export const setText = (text: string): TextActionTypes => ({
  type: SET_TEXT,
  payload: text,
});

export const setTextTyped = (typedText: string): TextActionTypes => {
  return {
    type: SET_TEXT_TYPED,
    payload: typedText,
  };
};