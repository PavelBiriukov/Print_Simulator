import { useState } from 'react';
import './StartPopap.css'

interface StartPopap {
  closePopup: () => void;
  close: string;
}
const StartPopap = ({closePopup, close}: StartPopap) => {
  
  return (
    <div style={{display: close}} className='popup' >
      <h1 className='h1_popup'>Приготовься печатать. Мы начинаем !!!</h1>
      <button onClick={() => closePopup()}  className='button'>НАЧАТЬ ПЕЧАТАТЬ</button>
    </div>
  );
};

export default StartPopap;