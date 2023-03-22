import { Link } from 'react-router-dom';

const colorRed = { color: 'red' };

export const ErrorDisplay = ({ errors, status }) =>
  (errors?.password && (
    <span className='pass-error' style={colorRed} data-test-id=' hint'>
      {errors?.password?.message}
      <Link to='forgot-pass'>Восстановить?</Link>
    </span>
  )) ||
  (errors?.identifier && (
    <span className='pass-error' style={colorRed} data-test-id=' hint'>
      {errors?.identifier?.message}
      <Link to='/forgot-pass'>Восстановить?</Link>
    </span>
  )) ||
  (status === 400 && (
    <span className='pass-error' style={colorRed} data-test-id=' hint'>
      Неверный логин или пароль!
      <Link to='/forgot-pass'>Восстановить?</Link>
    </span>
  )) || <Link to='/forgot-pass'>Забыли логин или пароль?</Link>;
