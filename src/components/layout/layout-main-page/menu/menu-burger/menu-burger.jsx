import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Menu } from '../menu';

import './menu-burger.scss';

export const Menuburger = ({ showArticle }) => {
  const [closeMenu, setCloseMenu] = useState(false);
  const setActive = ({ isActive }) => (isActive ? ' active item' : '');
  const dispatch = useDispatch();

  const wayDownMenu = () => {
    localStorage.removeItem('auth');
    setCloseMenu(true);
    dispatch({ type: 'ClOSE_BURGER' });
  };

  return (
    <div
      className={closeMenu ? 'burger-menu disabled' : 'burger-menu'}
      role='presentation'
      onClick={(e) => e.stopPropagation()}
      data-test-id='burger-navigation'
    >
      <Menu showArticle={showArticle} hanbdleClose={wayDownMenu} />
      <div className='border-menu' />
      <div className='terms-profile-container'>
        <NavLink className={setActive} to='/#' activeclassname='active item'>
          <button onClick={wayDownMenu} type='button' className='terms item'>
            Профиль
          </button>
        </NavLink>
        <NavLink className={setActive} to='/' activeclassname='active item'>
          <button onClick={wayDownMenu} type='button' className='terms item'>
            Выход
          </button>
        </NavLink>
      </div>
    </div>
  );
};
