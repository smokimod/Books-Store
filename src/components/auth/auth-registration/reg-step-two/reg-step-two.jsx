import React from 'react';

export const RegStepTwo = ({ register, errors, status }) => {
  const styleErrorFirstName = errors.firstName || status ? { borderBottom: 'solid 1px red' } : null;

  const styleErrorLastName = errors.lastName || status ? { borderBottom: 'solid 1px red' } : null;

  return (
    <React.Fragment>
      <label htmlFor='reg-firstName-input'>
        <input
          style={styleErrorFirstName}
          id='reg-firstName-input'
          type='text'
          name='firstName'
          placeholder=' '
          {...register('firstName', {
            required: 'Поле не может быть пустым',
          })}
        />
        <span>Имя</span>
        <div style={{ color: 'red' }}>{errors?.firstName?.message}</div>
      </label>
      <label htmlFor='reg-lastName-input'>
        <input
          style={styleErrorLastName}
          id='reg-lastName-input'
          type='text'
          name='lastName'
          placeholder=' '
          {...register('lastName', { required: 'Поле не может быть пустым' })}
        />
        <span>Фамилия</span>
        <div style={{ color: 'red' }}>{errors?.lastName?.message}</div>
      </label>
    </React.Fragment>
  );
};
