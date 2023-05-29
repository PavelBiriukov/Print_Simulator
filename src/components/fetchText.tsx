import { Dispatch } from "redux";
import { setText } from "../store/actions";
import { SET_TEXT, TextActionTypes } from "../types/types";

export const fetchText = () => {
  return async (dispatch: Dispatch<TextActionTypes>) => {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=1');
      const data = await response.json();
            
      if (Array.isArray(data) && data.length > 0) {
        dispatch(setText(data[0]));
      } else {
        console.error('Ошибка при загрузке текста: Некорректный формат данных');
      }
    } catch (error) {
      console.error('Ошибка при загрузке текста:', error);
    }
  };
};
export default fetchText;