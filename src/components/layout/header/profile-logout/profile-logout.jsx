import { Link } from 'react-router-dom';

import './profile-logout.scss';

const removeLocalStorageAuth = () => {
  localStorage.removeItem('auth');
};

export const ProfileLogout = ({ open }) => (
  <div className={open ? 'profile' : 'profile disable'}>
    <div className='profile-container'>
      <h3> Профиль</h3>
      <Link to='/' onClick={removeLocalStorageAuth} data-test-id='exit-button'>
        Выход
      </Link>
    </div>
  </div>
);
