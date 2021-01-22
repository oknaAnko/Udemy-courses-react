import React from 'react';
import { Link } from 'react-router-dom';

import bemCssModule from 'bem-css-modules';

import { default as AsideMenuStyles } from '../AsideMenu.module.scss';

const style = bemCssModule(AsideMenuStyles)

const AdminMenu = () => {
    return (
        <div>
            <p className={style('title')}>Panel administratora</p>
            <nav>
                <ul>
                    <li className={style('link')}>
                        <Link to="/manage-courses" replace className={style('a-tag')}>Zarządzanie kursami</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminMenu;