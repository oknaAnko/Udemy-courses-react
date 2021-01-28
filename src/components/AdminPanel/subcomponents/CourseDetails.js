import React, { useState, useContext } from 'react';
import request from '../../../helpers/request';
import bemCssModule from 'bem-css-modules';

import CoursePopup from './CoursePopup';

import { ErrorContext } from '../../../store/ErrorProvider';
import { StoreContext } from '../../../store/StoreProvider';

import { default as AdminPanelStyles } from '../AdminPanel.module.scss';

const style = bemCssModule(AdminPanelStyles);

const CourseDetails = (props) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { setCourses } = useContext(StoreContext);
    const { setErrorMessage } = useContext(ErrorContext);
    const { id, title } = props;

    const showPopup = () => setIsOpenPopup(true);

    const hidePopup = event => {
        if (event) {
            event.preventDefault();
        }
        setIsOpenPopup(false);
        setErrorMessage('');
    };

    const handleDeleteCourse = async () => {
        try {
            const { status } = await request.delete(`/courses/${id}`);

            if (status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id));
            }

        } catch (error) {
            const { response } = error;
            alert(response.data.message);
        }
    };

    return (
        <details>
            <summary className={style('summary')}>{title}</summary>
            <button className={style('btn')} onClick={showPopup}>Edytuj</button>
            <button className={style('btn')} onClick={handleDeleteCourse}>Usuń</button>
            <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props} />
        </details>
    );
}

export default CourseDetails;