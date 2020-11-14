import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import Modal from '../Modal/Modal'

import { StoreContext } from '../../store/StoreProvider';

import { default as LoginFormStyles } from './LoginForm.module.scss';
import request from '../../helpers/request';

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');

    const { setUser } = useContext(StoreContext);

    const handleOnChageLogin = ({ target: { value } }) => setLogin(value);
    const handleOnChagePassword = ({ target: { value } }) => setPassword(value);

    const handleOnCloseModal = e => {
        e.preventDefault();
        handleOnClose();
    }

    const resetStateOfInputs = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }

    const handleOnSubmit = async event => {
        event.preventDefault();
        const { data, status } = await request.post('/users', { login, password });

        if (status === 200) {
            setUser(data.user);
            resetStateOfInputs();
            handleOnClose();
        } else {
            setValidateMessage(data.message)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs()
        }
    }, [isModalOpen])

    const validateMessageComponent = validateMessage.length
        ? <p className={style('validate-message')}>{validateMessage}</p>
        : null

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shoudBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
                <div className={style('row')}>
                    <label htmlFor="">
                        Login:
                        <input type="text" value={login} onChange={handleOnChageLogin} />
                    </label>
                </div>
                <div className={style('row')}>
                    <label htmlFor="">
                        Hasło:
                        <input type="password" value={password} onChange={handleOnChagePassword} />
                    </label>
                </div>
                <div className={style('row')}>
                    <button type="submit">Zaloguj</button>
                    <button type="button" onClick={handleOnCloseModal}>Anuluj</button>
                </div>
            </form>
        </Modal>
    );
}

export default LoginForm;