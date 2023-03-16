import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import cross from '../../icons/creset_icon.svg';
import success_icon from '../../icons/error-case/Succes.svg';
import warning from '../../icons/error-case/WarningCircle.svg';

import './error-case.scss';

export const AlertCase = ({ text }) => {
  const success = useSelector((state) => state.comment.success);
  const [showerror, setShowError] = useState(false);
  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showPopUp]);

  return (
    showPopUp && (
      <aside className={success ? 'aside success' : showerror ? 'aside disabled' : 'aside'} data-test-id='error'>
        <div className='error-container'>
          <div className='warning-icon'>
            <img src={success ? success_icon : warning} alt={warning} />
          </div>
          <div className='error-text'>
            {text ? text : 'Что-то пошло не так. Обновите страницу через некоторое время.'}
          </div>
          <button type='button' className='error-cross' onClick={() => setShowError(true)}>
            <img src={cross} alt='cross' />
          </button>
        </div>
      </aside>
    )
  );
};
