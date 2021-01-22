import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import LoginForm from '../LoginForm/LoginForm'

import { StoreContext } from '../../store/StoreProvider';

import { default as HeaderStyles } from './Header.module.scss'

const style = bemCssModules(HeaderStyles)

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { user, setUser } = useContext(StoreContext)

    const handleOnClose = () => setIsModalOpen(false)

    const handleOnClick = () => {
        if (Boolean(user)) {
            setUser(null)
        } else {
            // console.log(setIsModalOpen);
            setIsModalOpen(true)
        }
    }

    const setProperlyLabel = Boolean(user) ? 'Wyloguj się' : 'Zaloguj się';

    return (
        <header className={style()}>
            <div className={style('wrapper')}>
                <div className={style('logo-wrapper')}>aA</div>
                <h1 className={style('title')}>Super kursy dla programistów</h1>
                <button className={style('btn-login')} onClick={handleOnClick}>{setProperlyLabel}</button>
                <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
            </div>
        </header>
    );
}

export default Header;