import React, { useState } from 'react';

import ConfirmedPassword from '../../../../icons/auth/confirm_password.svg';
import EyeClose from '../../../../icons/auth/eye_close.svg';
import EyeOpen from '../../../../icons/auth/eye_open.svg';

export const RegStepOne = ({ register, errors, status, watch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password] = watch(['password']);

  const styleErrorUserName = errors?.username || status ? { borderBottom: 'solid 1px red' } : null;

  const styleErrorPassword = errors?.password || status ? { borderBottom: 'solid 1px red' } : null;

  return (
    <React.Fragment>
      <label htmlFor='reg-login-input'>
        <input
          style={styleErrorUserName}
          id='reg-login-input'
          type='text'
          className='reg-login'
          name='username'
          placeholder=' '
          {...register('username', {
            required: true,
            pattern: /^(?=.*\d)[a-zA-Z0-9()*_\-!#$%^&*,."'\][]+$/,
            minLength: {
              value: 2,
              message: 'Используйте для логина латинский алфавит и цифры',
            },
          })}
        />
        <span>Придумайте логин для входа</span>
        <div style={errors.username ? { color: 'red' } : null} data-test-id=' hint'>
          {errors?.username?.message || 'Используйте для логина латинский алфавит и цифры'}
        </div>
      </label>
      <label htmlFor='reg-password-input'>
        <input
          style={styleErrorPassword}
          id='reg-password-input'
          type={showPassword ? 'text' : 'password'}
          className='reg-password'
          name='password'
          placeholder=' '
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
            },
            pattern: /(?=.*\d)(?=.*[A-Z])/,
          })}
        />
        <span>Пароль</span>
        <button type='button' className='icon-eye' onClick={() => setShowPassword(!showPassword)}>
          <img src={(showPassword && EyeOpen) || (!showPassword && EyeClose)} alt='eye' />
        </button>
        {errors.password || !password ? null : (
          <button className='icon-password' type='button' data-test-id='checkmark'>
            <img src={ConfirmedPassword} alt='ConfirmedPassword' />
          </button>
        )}

        <div style={errors.password ? { color: 'red' } : null} data-test-id=' hint'>
          {errors?.password?.message || 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
        </div>
      </label>
    </React.Fragment>
  );
};
