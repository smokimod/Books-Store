import { Link } from 'react-router-dom';

const colorRed = { color: 'red' };

export const ErrorDisplay = ({ errors, status }) =>
  (errors?.password && (
    <div className='pass-error' style={colorRed} data-test-id=' hint'>
      {errors?.password?.message}
      <Link to='forgot-pass'>Восстановить?</Link>
    </div>
  )) ||
  (errors?.identifier && (
    <div className='pass-error' style={colorRed} data-test-id=' hint'>
      {errors?.identifier?.message}
      <Link to='/forgot-pass'>Восстановить?</Link>
    </div>
  )) ||
  (status === 400 && (
    <div className='pass-error' style={colorRed} data-test-id=' hint'>
      Неверный логин или пароль!
      <Link to='/forgot-pass'>Восстановить?</Link>
    </div>
  )) || <Link to='/forgot-pass'>Забыли логин или пароль?</Link>;
