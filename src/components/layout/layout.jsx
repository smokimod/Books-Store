import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AlertCase } from '../error-case/error-case';

import { Menuburger } from './layout-main-page/menu/menu-burger/menu-burger';
import { Footer } from './footer';
import { Header } from './header';

import './layout.scss';

export const Layout = () => {
  const [openUserProfileWindow, setOpenUserProfileWindow] = useState(false);
  const burger = useSelector((state) => state.burger.isBurger);
  const error = useSelector((state) => state.books.error);
  const dispatch = useDispatch();

  const toggleUserProfileWindowClose = () => {
    setOpenUserProfileWindow(false);
  };

  const toggleUserProfileWindow = (e) => {
    e.stopPropagation();
    setOpenUserProfileWindow(!openUserProfileWindow);
  };

  const toggleBurger = () => {
    dispatch({ type: 'ClOSE_BURGER' });
  };

  return (
    <React.Fragment>
      <Header
        closeBurger={toggleBurger}
        toggleUserProfileWindow={toggleUserProfileWindow}
        openUserProfileWindow={openUserProfileWindow}
        toggleUserProfileWindowClose={toggleUserProfileWindowClose}
      />
      <main onClick={(toggleBurger, toggleUserProfileWindowClose)} role='presentation'>
        {error && <AlertCase />}
        <Outlet />
        {burger && <Menuburger showArticle={burger} />}
      </main>
      <Footer closeBurger={toggleBurger} toggleUserProfileWindowClose={toggleUserProfileWindowClose} />
    </React.Fragment>
  );
};
