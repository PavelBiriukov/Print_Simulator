import React, { useState } from 'react';
import './MainMenu.css'
interface MainMenuDisplayStatus {
    openPopups: (str: string) => void;
    name: string;
    IsLoggedIn: boolean;
}
const MainMenu = ({openPopups, name, IsLoggedIn}: MainMenuDisplayStatus) => {
    const rand = Math.floor( 1 + Math.random() * (100000 - 1));
    return (
        <div className='divMenu'>
            <div className='divUser'>
                <img className='logo' src='https://amigos.lv/img/blog/0/34/7336/TAawrgYTvJ2oh5bma.jpeg' alt="LOGO" />
                <p className='textMenu'>{name? name:`User:${rand}`}</p>
            </div>
            <div>
                <button onClick={() => openPopups('login')} className='buttonMenu'>{IsLoggedIn? 'Выйти':"Войти"}</button>
                <button onClick={() => openPopups('register')} className='buttonMenu' style={IsLoggedIn? {display: 'none'}: {display: 'inline-block'}}>Регистрация</button>
            </div>
        </div>
    );
};

export default MainMenu;