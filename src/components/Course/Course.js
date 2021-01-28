import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import request from '../../helpers/request';
import bemCssModules from 'bem-css-modules';

import Modal from '../Modal/Modal';

import { ErrorContext } from '../../store/ErrorProvider';
import { StoreContext } from '../../store/StoreProvider';

import { default as CourseStyles } from './Course.module.scss';

const style = bemCssModules(CourseStyles);

const Course = ({ authors, id, img, isUserContext = false, price, title }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const { user, setUser } = useContext(StoreContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const history = useHistory();

    const allAuthors = authors.join(', ');
    const isUserLogged = Boolean(user);

    const hidePopup = event => {
        if (event) {
            event.preventDefault();
        }
        setIsOpenPopup(false);
    };
    const handleOnCloseModal = event => {
        event.preventDefault();
        setIsOpenPopup(false);
    }

    const handleOnClick = async () => {
        try {
            const { data, status } = await request.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id
                }
            );

            if (status === 202) {
                setUser(data.user);
                history.push('/my-courses');
            }

        } catch (error) {
            const { response } = error;
            setErrorMessage(response.data.message);
            setIsOpenPopup(true);
        }
    };

    const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

    const validateMessageComponent = errorMessage.length
        ? <p className={style('validate-message')}>{errorMessage}</p>
        : null;

    return (
        <li>
            <article className={style()}>
                <img alt={title} className={style('image')} src={img} />
                <h3 className={style('title')}>{title}</h3>
                <p className={style('price')}>{`Koszt kursu: ${price} zł`}</p>
                <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
                {shouldBeBuyButtonVisible && <button className={style('btn')} onClick={handleOnClick}>Zakup kurs</button>}
                <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
                    <div className={style('validate-popup')}>
                        {validateMessageComponent}
                        <button type="button" className={style('btn')} onClick={handleOnCloseModal}>OK</button>
                    </div>
                </Modal>
            </article>
        </li>
    );
}

export default Course;