import React, { useState } from 'react';
import Popups from './Popups';
export interface LoginPopupDisplayStatus {
    isOpen: boolean;
    onClose: (srt: string) => void;
    onLogin: (data: { username: string, password: string }) => void;
}
const LoginPopup = ({isOpen, onClose, onLogin}: LoginPopupDisplayStatus) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
      event.preventDefault();
      onLogin({ username, password });
    };

    return (
        <>
            <Popups isOpen={isOpen} onClose={() => onClose('login')}>
                <div className='divLogReg' style={{display: 'flex'}}>
                    <form onSubmit={handleLogin}>
                        <p className='h1'>Авторизоваться</p>
                        <input value={username} onChange={event => setUsername(event.target.value)} className='inputLog' type="text" placeholder='Логин'/>
                        <input value={password} onChange={event => setPassword(event.target.value)} className='inputLog' type="text" placeholder='Пароль'/>
                        <button type="submit" onClick={() => onClose('login')}  className='buttonResult buttonRegLog'>Войти</button> 
                    </form>
                </div>
            </Popups>
        </>
        
        
    );
};

export default LoginPopup;