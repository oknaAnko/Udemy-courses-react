import React, { useState, useContext } from 'react';
import bemCssModule from 'bem-css-modules';

import CourseDetails from './subcomponents/CourseDetails';
import CoursePopup from './subcomponents/CoursePopup';

import { ErrorContext } from '../../store/ErrorProvider';
import { StoreContext } from '../../store/StoreProvider';

import { default as AdminPanelStyles } from './AdminPanel.module.scss';

const style = bemCssModule(AdminPanelStyles)

const AdminPanel = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { courses } = useContext(StoreContext);
    const { setErrorMessage } = useContext(ErrorContext);

    const showPopup = () => setIsOpenPopup(true);

    const hidePopup = event => {
        if (event) {
            event.preventDefault();
        }
        setIsOpenPopup(false);
        setErrorMessage('');
    };

    const courseElements = courses.map(course => <CourseDetails key={course.id}{...course} />)

    return (
        <section className={style()}>
            {courseElements}
            <button className={style('btn')} onClick={showPopup}>Dodaj nowy kurs</button>
            <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
        </section>
    );
}

export default AdminPanel;