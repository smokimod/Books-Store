/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { BooksSlice, CategoryOfBooksSlice } from '../../../store/books-slice';

import { Menu } from './menu';

import '../layout.scss';

export const LayoutMainPage = () => {
  const books = useSelector((state) => state.books.books);
  const categories = useSelector((state) => state.books.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    const getInitialData = async () => {
      categories.length > 0 ? null : await dispatch(CategoryOfBooksSlice());
      books.length > 0 ? null : await dispatch(BooksSlice());
    };

    getInitialData();
  }, [dispatch, categories, books.length]);

  return (
    <div className='main-container'>
      <div className='show-menu'>
        <Menu />
      </div>
      <Outlet />
    </div>
  );
};
