/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { BooksSlice, CategoryOfBooksSlice } from '../../../store/books-slice';

import { Menu } from './menu';

import '../layout.scss';

export const LayoutMainPage = () => {
  const { books, categories } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  useEffect(() => {
    const getInitialData = () => {
      categories.length > 0 ? null : dispatch(CategoryOfBooksSlice());
      books.length > 0 ? null : dispatch(BooksSlice());
    };

    getInitialData();
  }, [dispatch, categories.length, books.length]);

  return (
    <div className='main-container'>
      <div className='show-menu'>
        <Menu />
      </div>
      <Outlet />
    </div>
  );
};
