import { Link } from 'react-router-dom';

export const ErrorDisplay = ({ errors, status }) =>
  (errors?.password && (
    <span className='pass-error' style={{ color: 'red' }} data-test-id=' hint'>
      {errors?.password?.message}
      <Link to='/auth/forgot-pass'>Восстановить?</Link>
    </span>
  )) ||
  (errors?.identifier && (
    <span className='pass-error' style={{ color: 'red' }} data-test-id=' hint'>
      {errors?.identifier?.message}
      <Link to='/auth/forgot-pass'>Восстановить?</Link>
    </span>
  )) ||
  (status === 400 && (
    <span className='pass-error' style={{ color: 'red' }} data-test-id=' hint'>
      Неверный логин или пароль!
      <Link to='/auth/forgot-pass'>Восстановить?</Link>
    </span>
  )) || <Link to='/auth/forgot-pass'>Забыли логин или пароль?</Link>;
