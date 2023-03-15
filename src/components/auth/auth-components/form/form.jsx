import { useLocation } from 'react-router-dom';

import './form.scss';

export const Form = ({ handleSubmit, children }) => {
  const location = useLocation().pathname.slice(1);

  return (
    <form
      action=''
      className='register-form'
      onSubmit={handleSubmit}
      data-test-id={
        location === 'auth/local'
          ? 'auth-form '
          : location === 'auth/register'
          ? 'register-form '
          : 'reset-password-form '
      }
    >
      <div className='register-container'>{children}</div>
    </form>
  );
};
