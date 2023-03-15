import { useState } from 'react';

import cross from '../../icons/creset_icon.svg';
import warning from '../../icons/error-case/WarningCircle.svg';

import './error-case.scss';

export const ErrorCase = () => {
  const [showerror, setShowError] = useState(false);

  return (
    <aside className={showerror ? 'disbaled-error-block' : ''} data-test-id='error'>
      <div className='error-container'>
        <div className='warning-icon'>
          <img src={warning} alt={warning} />
        </div>
        <div className='error-text'>Что-то пошло не так. Обновите страницу через некоторое время.</div>
        <button type='button' className='error-cross' onClick={() => setShowError(true)}>
          <img src={cross} alt='cross' />
        </button>
      </div>
    </aside>
  );
};
