import React, { useState } from 'react';
import { LoginPopupDisplayStatus } from './LoginPopup';
import Popups from './Popups';
 interface RegistrationPopupStatus {
    isOpen: boolean;
    onClose: (srt: string) => void;
    onRegister: (data: { username: string, mail: string, password: string }) => void
 }
const RegistrationPopup = ({isOpen, onClose, onRegister}: RegistrationPopupStatus) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        onRegister({ username, mail, password });
      };
    return (
        <>
            <Popups isOpen={isOpen} onClose={() => onClose('register')}>
                <div className='divLogReg' style={{display: 'flex'}}>
                    <form onSubmit={handleRegister}>
                        <p className='h1'>Регистрация</p>
                        <input value={username} onChange={event => setUsername(event.target.value)} className='inputLog' type="text" placeholder='Логин'/>
                        <input value={mail} onChange={event => setMail(event.target.value)} className='inputLog' type="text" placeholder='Почта'/>
                        <input value={password} onChange={event => setPassword(event.target.value)} className='inputLog' type="text" placeholder='Пароль'/>
                        <button type="submit" onClick={() => onClose('register')}  className='buttonResult buttonRegLog'>Регистрация</button>
                    </form> 
                </div>
            </Popups>  
        </>
        
    );
};

export default RegistrationPopup;