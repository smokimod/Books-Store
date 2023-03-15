import React, { useState } from 'react';

import EyeClose from '../../../../icons/auth/eye_close.svg';
import EyeOpen from '../../../../icons/auth/eye_open.svg';
import { ErrorDisplay } from '../../auth-components/error/error';

export const LogInInputs = ({ register, errors, status, isDirty, isValid }) => {
  const [showPassword, setShowPassword] = useState(false);

  const styleError =
    errors?.password || errors?.identifier || status === 400 ? { borderBottom: 'solid 1px red' } : null;

  return (
    <React.Fragment>
      <label htmlFor='reg-identifier-input'>
        <input
          style={styleError}
          id='reg-identifier-input'
          type='text'
          className='reg-login'
          name='identifier'
          placeholder=' '
          {...register('identifier', {
            required: 'Неверный логин или пароль!',
          })}
        />
        <span>Придумайте логин для входа</span>
      </label>
      <label htmlFor='reg-password-input'>
        <input
          style={styleError}
          id='reg-password-input'
          type={showPassword ? 'text' : 'password'}
          className='reg-password'
          name='password'
          placeholder=' '
          {...register('password', {
            required: 'Неверный логин или пароль!',
          })}
        />
        <span>Пароль</span>
        <button
          data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
          type='button'
          className='icon-eye'
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src={(showPassword && EyeOpen) || (!showPassword && EyeClose)} alt='eye' />
        </button>
      </label>
      <div className='restore-password'>
        <ErrorDisplay errors={errors} status={status} isDirty={isDirty} isValid={isValid} />
      </div>
    </React.Fragment>
  );
};
