export const SET_TEXT = 'SET_TEXT' as const;
export const SET_TEXT_TYPED = 'SET_TEXT_TYPED' as const;

export interface SetTextAction {
  type: typeof SET_TEXT;
  payload: string;
}

export interface SetTextTypedAction {
  type: typeof SET_TEXT_TYPED;
  payload: string;
}

export type TextActionTypes = SetTextAction | SetTextTypedAction;

export interface TextState {
  text: string;
  typedText: string;
}

export interface RootState {
  text: TextState;
}
