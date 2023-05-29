import React from 'react';
import "./Result.css";
interface Result {
  text: string;
  procent: number;
  startTime: number | any;
  typedText: string;
  isFinished: boolean;
}
const Result = ({text, procent, startTime, typedText, isFinished}: Result) => {
  const getAccuracy = () => {
    const correctCount = ((text.length + procent) / 100);
    const accuracy = text.length / correctCount
    return Math.round(accuracy * 100)/100
  };
  const getSpeed = () => {
    const minutes = (Date.now() - startTime) / 1000 / 60;
    const speed = minutes === 0 ? 0 : Math.floor(typedText.length / minutes);
    return speed;
  };
  return (
    <>
      {isFinished ? <div className='div'>
        <p className='p'>Точность: {getAccuracy()}%</p>
        <p className='p'>Скорость: {getSpeed()} зн/мин</p>
        <p className='p'>Время: {((Date.now() - startTime) / 1000).toFixed(2)} сек</p>
        <button onClick={() => window.location.reload()} className='buttonResult'>Заново</button>
      </div> 
      :
      typedText.length > 0 && (
      <div className='div'>
        <p className='p'>Точность: {getAccuracy()}%</p>
        <p className='p'>Скорость: {getSpeed()} зн/мин</p>
        <button onClick={() => window.location.reload()} className='buttonResult' >Заново</button>
      </div>
      )
      }
      
    </>
    
  );
};

export default Result;