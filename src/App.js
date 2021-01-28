import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import AsideMenu from './components/AsideMenu/AsideMenu';
import Content from './components/Content/Content';
import Header from './components/Header/Header';

import ErrorProvider from './store/ErrorProvider';
import StoreProvider from './store/StoreProvider';

import './App.scss';

const App = () => {
    return (
        <StoreProvider>
            <ErrorProvider>
                <Header />
                <Router>
                    <div className="content-wrapper">
                        <AsideMenu />
                        <Content />
                    </div>
                </Router>
            </ErrorProvider>
        </StoreProvider>
    );
}

export default App;