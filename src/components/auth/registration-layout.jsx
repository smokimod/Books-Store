import { Outlet } from 'react-router-dom';

import './registration-layout.scss';

export const RegistrationLayout = () => (
  <div className='auth-layout' data-test-id='auth'>
    <div className='auth-container'>
      <h1 className='auth-head'>Cleverland</h1>
      <Outlet />
    </div>
  </div>
);
