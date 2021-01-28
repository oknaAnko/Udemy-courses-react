import React, { useContext, useEffect, useState } from 'react';
import request from '../../helpers/request';
import bemCssModules from 'bem-css-modules';

import Modal from '../Modal/Modal';

import { StoreContext } from '../../store/StoreProvider';
import { ErrorContext } from '../../store/ErrorProvider';

import { default as LoginFormStyles } from './LoginForm.module.scss';

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(StoreContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const handleOnChageLogin = ({ target: { value } }) => setLogin(value);
    const handleOnChagePassword = ({ target: { value } }) => setPassword(value);

    const handleOnCloseModal = event => {
        event.preventDefault();
        handleOnClose();
    }

    const resetStateOfInputs = () => {
        setLogin('');
        setPassword('');
        setErrorMessage('');
    }

    const handleOnSubmit = async event => {
        try {
            event.preventDefault();
            const { data, status } = await request.post('/users', { login, password });

            if (status === 200) {
                setUser(data.user);
                resetStateOfInputs();
                handleOnClose();
            }

        } catch (error) {
            const { response } = error;
            setErrorMessage(response.data.message)
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs()
        }
    }, [isModalOpen])

    const validateMessageComponent = errorMessage.length
        ? <p className={style('validate-message')}>{errorMessage}</p>
        : null;

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shoudBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
                <div className={style('row')}>
                    <label className={style('label')}>
                        Login:
                    <input type="text" value={login} onChange={handleOnChageLogin} className={style('input')} />
                    </label>
                </div>
                <div className={style('row')}>
                    <label className={style('label')}>
                        Hasło:
                        <input type="password" value={password} onChange={handleOnChagePassword} className={style('input')} />
                    </label>
                </div>
                <button type="submit" className={style('btn')}>Zaloguj</button>
                <button type="button" className={style('btn', { cancel: true })} onClick={handleOnCloseModal}>Anuluj</button>
            </form>
        </Modal>
    );
}

export default LoginForm;