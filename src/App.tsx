import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchText } from './components/fetchText';
import { RootState } from './types/types';
import { setTextTyped } from './store/actions';
import './App.css'
import Result from './components/Result';
import StartPopap from './components/StartPopap';
const App = () => {
  const dispatch: any = useDispatch();
  const text = useSelector((state: RootState) => state.text.text);
  /* const text = 'pasha' */
  const [typedText, setTypedText] = useState('');
  const [procent, setProcent] = useState(0);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typedTextRef = useRef<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const isFinished = typedText.length === text.length;
  let [close, setClose] = useState<string>('flex');
  useEffect(() => {
    dispatch(fetchText());
  }, [dispatch]);
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const currentChar = text[typedText.length];
    if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'CapsLock' || key === 'F5' || key === 'F12') {
      return;
    }
    if (key === currentChar) {
      const updatedTypedText = typedText + key;
      typedTextRef.current = updatedTypedText;
      setTypedText(updatedTypedText);
      setError(false);
      dispatch(setTextTyped(updatedTypedText));
      
    } else {
      setProcent(procent => procent + 1)
      setError(true);
    }
    event.preventDefault(); // Prevent the default behavior of the input field
  };
  
  const closePopup = () => {
    if(close = 'flex'){
      setClose(close ='none');
      inputRef.current?.focus();
      if (startTime === 0) {
        setStartTime(Date.now());
      }
    }
  }
  return (
    <>
      <div className='block'>
        <div className='container'>
          <StartPopap closePopup={closePopup} close={close}/>
          <h1 className='h1'>Тренажер слепой печати</h1>
          <h2 className='h2'>Колличество символов: {text.length}</h2>
          <p className='text'>
            {text.split('').map((char, index) => (
              <span
                className={index < typedText.length ? 'typed' : index === typedText.length ? 'current' : ''}
                key={index}
              >
                {char}
              </span>
            ))}
          </p>
          <input
            className='input'
            ref={inputRef}
            disabled={isFinished}
            type="text"
            onKeyDown={handleKeyPress}
            value={typedText}
            onChange={(event) => setTypedText(event.target.value)}
          />
          <Result 
            isFinished={isFinished} 
            procent={procent} 
            startTime={startTime} 
            text={text} 
            typedText={typedText}
          />
          
          {error && <p className='error'>Ошибка! Пожалуйста, исправьте ввод.</p>}
        </div>
        
      </div>
    </>
  );
};


export default App;

