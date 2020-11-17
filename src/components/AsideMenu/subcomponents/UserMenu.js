import React from 'react';
import { Link } from 'react-router-dom';

import bemCssModule from 'bem-css-modules';

import { default as AsideMenuStyles } from '../AsideMenu.module.scss';

const style = bemCssModule(AsideMenuStyles)

const UserMenu = ({ isUserLogged }) => {
    return (
        <div>
            <p className={style('title')}>Panel użytkownika</p>
            <nav>
                <ul>
                    <li className={style('link')}>
                        <Link to="/">Kursy w sprzedaży</Link>
                    </li>
                    {isUserLogged && <li className={style('link')}><Link to="/my-courses">Moje zakupione kursy</Link></li>}
                </ul>
            </nav>
        </div>
    );
}

export default UserMenu;