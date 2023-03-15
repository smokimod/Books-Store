import React, { useState } from 'react';

import ConfirmedPassword from '../../../../icons/auth/confirm_password.svg';
import EyeClose from '../../../../icons/auth/eye_close.svg';
import EyeOpen from '../../../../icons/auth/eye_open.svg';

export const RestorePasswordInputs = ({ register, errors, isDirty, isValid }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatablePassword, setShowRepeatablePassword] = useState(false);

  const styleError = errors?.password || errors?.passwordConfirmation ? { borderBottom: 'solid 1px red' } : null;

  return (
    <React.Fragment>
      <label htmlFor='restore-password-input'>
        <input
          style={styleError}
          id='restore-password-input'
          type={showPassword ? 'text' : 'password'}
          className='reg-login'
          name='password'
          placeholder=' '
          {...register('password')}
        />
        <span>Новый пароль</span>
        <button type='button' className='icon-eye' onClick={() => setShowPassword(!showPassword)}>
          <img src={(showPassword && EyeOpen) || (!showPassword && EyeClose)} alt='eye' />
        </button>
        <button className='icon-password' type='button'>
          {isValid && isDirty ? <img src={ConfirmedPassword} alt='ConfirmedPassword' /> : null}
        </button>
        <span>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
      </label>
      <label htmlFor='passwordConfirmation'>
        <input
          style={styleError}
          id='passwordConfirmation'
          type={showRepeatablePassword ? 'text' : 'password'}
          className='reg-password'
          name='passwordConfirmation'
          placeholder=' '
          {...register('passwordConfirmation')}
        />
        <span>Повторите пароль</span>
        <button type='button' className='icon-eye' onClick={() => setShowRepeatablePassword(!showRepeatablePassword)}>
          <img src={(showRepeatablePassword && EyeOpen) || (!showRepeatablePassword && EyeClose)} alt='eye' />
        </button>
      </label>
      {(errors?.password && (
        <span className='restore-password' style={{ color: 'red' }} data-test-id=' hint'>
          {errors?.password?.message && ''}
        </span>
      )) ||
        (errors?.passwordConfirmation && (
          <span className='restore-password' style={{ color: 'red' }} data-test-id=' hint'>
            {errors?.passwordConfirmation?.message}
          </span>
        ))}
    </React.Fragment>
  );
};
