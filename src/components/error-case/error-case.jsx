/* eslint-disable no-negated-condition */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import cross from '../../icons/creset_icon.svg';
import success_icon from '../../icons/error-case/Succes.svg';
import warning from '../../icons/error-case/WarningCircle.svg';

import './error-case.scss';

export const AlertCase = ({ text, successOrder, deleteOrder, reOdrerBook }) => {
  const success = useSelector((state) => state.comment.success);
  const orderStatusError = useSelector((state) => state.comment.error);

  const [showerror, setShowError] = useState(false);
  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showPopUp, setShowPopUp]);

  const closeModal = () => {
    // setShowPopUp(false);
    setShowError(true);
  };

  const succesCondition = success || successOrder || text || reOdrerBook || deleteOrder;

  const textIno = text
    ? text
    : successOrder
    ? 'Книга забронирована. Подробности можно посмотреть на странице Профиль'
    : orderStatusError && successOrder
    ? 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
    : deleteOrder
    ? 'Бронирование книги успешно отменено!'
    : deleteOrder && orderStatusError
    ? 'Не удалось снять бронирование книги.Попробуйте позже!'
    : reOdrerBook
    ? 'Изменения успешно сохранены'
    : reOdrerBook && orderStatusError
    ? 'Изменения не были сохранены. Попробуйте позже!'
    : 'Что-то пошло не так. Попробуйте позже!';

  return (
    showPopUp && (
      <aside
        className={succesCondition ? 'aside success' : showerror ? 'aside disabled' : 'aside'}
        data-test-id='error'
      >
        <div className='error-container'>
          <div className='warning-icon'>
            <img src={succesCondition ? success_icon : warning} alt={warning} />
          </div>
          <div className='error-text'>{textIno}</div>
          <button type='button' className='error-cross' onClick={closeModal}>
            <img src={cross} alt='cross' />
          </button>
        </div>
      </aside>
    )
  );
};
