
import React, { useState, useContext } from 'react';
import request from '../../../helpers/request';
import bemCssModules from 'bem-css-modules';

import Modal from '../../Modal/Modal';

import { ErrorContext } from '../../../store/ErrorProvider';
import { StoreContext } from '../../../store/StoreProvider';

import { default as CoursePopupStyles } from './CoursePopup.modules.scss';

const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({
    authors = [],
    hidePopup,
    isEditMode = true,
    isOpenPopup,
    id,
    img = '',
    price = 0,
    title = '',
}) => {
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setFormAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const { setCourses } = useContext(StoreContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);

    const handleOnChangeAuthor = event => setFormAuthor(event.target.value);
    const handleOnChangeImg = event => setFormImg(event.target.value);
    const handleOnChangePrice = event => setFormPrice(event.target.value);
    const handleOnChangeTitle = event => setFormTitle(event.target.value);

    const handleOnSubmit = async event => {
        try {
            event.preventDefault();

            const courseObject = {
                authors: formAuthors,
                id,
                img: formImg,
                price: Number(formPrice),
                title: formTitle,
            };

            if (isEditMode) {
                const { data, status } = await request.put('/courses', courseObject);

                if (status === 202) {
                    setCourses(data.courses);
                }
            } else {
                const { data, status } = await request.post('/courses', courseObject);

                if (status === 201) {
                    setCourses(data.courses)
                }
            };

            hidePopup();

        } catch (error) {
            const { response } = error;
            setErrorMessage(response.data.message);
        }
    };

    const addAuthor = event => {
        event.preventDefault();
        setFormAuthors(prev => [...prev, formAuthor]);
        setFormAuthor('');
    };

    const deleteAuthor = event => {
        const authorToDelete = event.target.dataset.author;
        setFormAuthors(prev => prev.filter(author => author !== authorToDelete))
    };

    const authorsElements = formAuthors.map(author => (
        <li key={author}>
            <p className={style('authors')}>{author}</p>
            <button className={style('btn', { small: true })} data-author={author} onClick={deleteAuthor}>Usuń</button>
        </li>
    ));

    const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs';

    const validateMessageComponent = errorMessage.length
        ? <p className={style('validate-message')}>{errorMessage}</p>
        : null;

    return (
        <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
            <div className={style()}>
                <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
                    <div className={style('form-row')}>
                        <label className={style('label')}>
                            Autor:
                            <input className={style('input')} type="text" value={formAuthor} onChange={handleOnChangeAuthor} />
                            <button className={style('btn', { small: true })} onClick={addAuthor}>Dodaj autora</button>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label className={style('label')}>
                            Obrazek url:
                            <input className={style('input')} type="text" value={formImg} onChange={handleOnChangeImg} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label className={style('label')}>
                            Cena:
                            <input className={style('input')} type="number" value={formPrice} onChange={handleOnChangePrice} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label className={style('label')}>
                            Tytuł:
                            <input className={style('input')} type="text" value={formTitle} onChange={handleOnChangeTitle} />
                        </label>
                    </div>
                    <button className={style('btn')} type="submit">{correctLabel}</button>
                    <button className={style('btn', { cancel: true })} onClick={hidePopup} type="button">Anuluj</button>
                    {validateMessageComponent}
                </form>
                <p className={style('authors')}>Lista autorów:</p>
                <ul className={style('list')}>
                    {authorsElements}
                </ul>
            </div>
        </Modal>
    );
}

export default CoursePopup;