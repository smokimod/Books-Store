/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import ArrowBack from '../../../icons/auth/arrow_Back_to_logIn.svg';
import { getAuthReducer, getErrorAuthReducer, loadingAuthReducer } from '../../../store/authReducer';
import { Loader } from '../../loader';
import { Button } from '../auth-components/button/button';
import { LinkTo } from '../auth-components/link/link';
import { RestorePassword } from '../restore-password/restore-password';

import { Message } from './message/message';

import '../common-styles.scss';
import './forgot-password.scss';

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
  });

  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const userData = useSelector((state) => state.auth.userData);
  const location = useLocation();

  const styleError = errors?.email || status ? { borderBottom: 'solid 1px red' } : null;

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(loadingAuthReducer());
    axios
      .post('https://strapi.cleverland.by/api/auth/forgot-password', data)
      .then((results) => {
        dispatch(getAuthReducer(results));
        setShowModal(true);
        setStatus('');
        reset();
      })
      .catch((error) => {
        dispatch(getErrorAuthReducer(error));
        error && error.response && setStatus(error.response.status);
      });
  };

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}

      {(location.search && <RestorePassword />) ||
        (userData?.status === 200 && showModal && !location?.search && <Message />) || (
          <form className='restore-form' onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
            <div className='back-to-login-link-container'>
              <Link className='back-to-login-link' to='/auth/local'>
                <div>
                  <img src={ArrowBack} alt='arrow' />
                </div>
                вход в личный кабинет
              </Link>
            </div>
            <div className='back-to-login-container'>
              <h4>Восстановление пароля</h4>
              <div className='reg-required-inputs-container'>
                <label htmlFor='restore-email-input'>
                  <input
                    style={styleError}
                    id='restore-email-input'
                    type='email'
                    className='reg-login'
                    name='email'
                    placeholder=' '
                    {...register('email', {
                      required: 'Введите коректный email',
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  <span>Email</span>
                  <div>
                    {(errors?.email?.message && <div style={{ color: 'red' }}>{errors.email.message}</div>) ||
                      (status && <span style={{ color: 'red' }}>Введите коректный email</span>)}
                    На это email будет отправлено письмо с инструкциями по восстановлению пароля
                  </div>
                </label>
              </div>
              <div className='next-move-container'>
                <Button isDirty={isDirty} isValid={isValid}>
                  восстановить
                </Button>
                <LinkTo question='Нет учётной записи?' link='Регистрация' path='/auth/register' />
              </div>
            </div>
          </form>
        )}
    </React.Fragment>
  );
};
