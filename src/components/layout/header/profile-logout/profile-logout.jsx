import { Link } from 'react-router-dom';

import './profile-logout.scss';

const removeLocalStorageAuth = () => {
  localStorage.removeItem('auth');
};

export const ProfileLogout = ({ openUserProfileWindow }) => (
  <div
    className={openUserProfileWindow ? 'profile' : 'profile disable'}
    onClick={(e) => e.stopPropagation()}
    role='presentation'
  >
    <div className='profile-container'>
      <h3> Профиль</h3>
      <Link to='/' onClick={removeLocalStorageAuth} data-test-id='exit-button'>
        Выход
      </Link>
    </div>
  </div>
);
