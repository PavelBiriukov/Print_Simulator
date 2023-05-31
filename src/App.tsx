import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchText } from './components/fetchText';
import { RootState } from './types/types';
import { setTextTyped } from './store/actions';
import './App.css'
import Result from './components/Result';
import StartPopap from './components/StartPopap';
import MainMemu from './components/MainMenu';
import LoginPopup from './components/LoginPopup';
import RegistrationPopup from './components/RegistrationPopup';

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
  let [displayStatus, setDisplayStatus] = useState<string>('flex');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [popups, setPopups] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchText());
  }, [dispatch]);

  //Некоторый функции можно вынести в отдельные компоненты но время ограниченное ток что не успеваю

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
    if(displayStatus = 'flex'){
      setDisplayStatus(displayStatus ='none');
      inputRef.current?.focus();
      if (startTime === 0) {
        setStartTime(Date.now());
      }
    }
  }
  
  const openPopups = (popupName: string) => {
    if(isLoggedIn){
      setIsLoggedIn(false);
      setPopups((prevPopups) => ({
        ...prevPopups,
        [popupName]: false,
      }));
    }
    else{
      setPopups((prevPopups) => ({
        ...prevPopups,
        [popupName]: true,
      }));
    }
    
  };
  const closePopups = (popupName: string) => {
    setPopups((prevPopups) => ({
      ...prevPopups,
      [popupName]: false,
    }));
  };

  const handleRegister = (data: { username: string, mail: string, password: string }) => {
    // Здесь можно обработать зарегистрированные данные, например, отправить их на сервер или сохранить в локальное хранилище.
    console.log('Registered:', data);
    // Закрываем попап регистрации
    closePopups('register');
  };

  const handleLogin = (data: { username: string, password: string }) => {
    // Здесь можно обработать данные авторизации, например, отправить их на сервер для проверки.

    // Предположим, что авторизация успешна
    setIsLoggedIn(true);

    setUsername(data.username);
    // Закрываем попап для логина
    closePopups('login');
  };
  const handleLogout = () => {
    // Здесь можно добавить логику выхода из системы, например, очистить токены аутентификации и сбросить статус авторизации.
    setIsLoggedIn(false);
  };
  return (
    <>
      <MainMemu openPopups={openPopups} name={username} IsLoggedIn={isLoggedIn}/>
      <LoginPopup isOpen={popups['login']} onClose={closePopups} onLogin={handleLogin}/>
      <RegistrationPopup isOpen={popups['register']} onClose={closePopups} onRegister={handleRegister}/>
      <div className='block'>
        <div className='container'>
          <StartPopap closePopup={closePopup} close={displayStatus}/>
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
