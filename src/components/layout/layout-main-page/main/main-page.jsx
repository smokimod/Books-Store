import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { OrderBookCalendar } from '../../../calendar/calendar';
import { AlertCase } from '../../../error-case/error-case';
import { Loader } from '../../../loader';
import { BooksPlate } from '../main-books/books-plate';
import { BookSqure } from '../main-books/books-squre';

import { PlateSqureButtoms } from './plate-squre-buttoms/plate-squre-buttoms';
import { SearchField } from './search-field/search-field';

import './main-page.scss';

export const MainPage = () => {
  const currentUserId = useSelector((state) => state.auth.userData.data.user.id);
  const books = useSelector((state) => state.books.books);
  const error = useSelector((state) => state.books.error);
  const loading = useSelector((state) => state.books.loading);
  const categories = useSelector((state) => state.books.categories);
  const successOrder = useSelector((state) => state.orderBook.succes);
  const deleteOrder = useSelector((state) => state.orderBook.delete);
  const reOdrerBook = useSelector((state) => state.orderBook.reOrder);
  const orderStatusError = useSelector((state) => state.orderBook.error);

  const { category } = useParams();

  const [showSeacthBar, setShowSeacthBar] = useState(false);
  const [showPlate, setShowPlate] = useState(true);
  const [sortByRating, setSortByRating] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const chooseCategoryByName = categories.find((item) => item.path === category);

  const toggleShowBar = () => (window.innerWidth <= 320 ? setShowSeacthBar(!showSeacthBar) : 'disabled');

  const finallBooks = useMemo(() => {
    const filterByCategory =
      category === 'all' ? books : books.filter((item) => item.categories.includes(chooseCategoryByName.name));

    const sortByName = filterByCategory.filter((item) => item.title.toLowerCase().includes(searchParam.toLowerCase()));

    const sort = sortByName.sort((a, b) => (sortByRating ? a.rating - b.rating : b.rating - a.rating));

    return sort;
  }, [category, searchParam, books, chooseCategoryByName, sortByRating]);

  const orderBook = (e, item) => {
    e.preventDefault();
    sessionStorage.setItem('bookID', JSON.stringify(item));

    if (sessionStorage.getItem('bookID') === 'undefined') {
      sessionStorage.removeItem('bookID');
    }
    setShowCalendar(!showCalendar);
  };

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      <OrderBookCalendar showCalendar={showCalendar} orderBook={orderBook} setShowCalendar={setShowCalendar} />
      {successOrder || deleteOrder || reOdrerBook || orderStatusError ? (
        <AlertCase successOrder={successOrder} deleteOrder={deleteOrder} reOdrerBook={reOdrerBook} />
      ) : (
        ''
      )}
      <section className={error || loading ? 'article-section hidden' : 'article-section'}>
        <div className='navigation-wraper'>
          <div className='navigation-menu'>
            <SearchField
              setSearchParam={setSearchParam}
              searchParam={searchParam}
              sortByRating={sortByRating}
              setSortByRating={setSortByRating}
              toggleShowBar={toggleShowBar}
              showSeacthBar={showSeacthBar}
            />
            <PlateSqureButtoms showSeacthBar={showSeacthBar} setShowPlate={setShowPlate} showPlate={showPlate} />
          </div>
          <div className='books'>
            <div className={showPlate ? 'books-container' : 'books-container-plate'}>
              {finallBooks.length > 0 ? (
                finallBooks.map((item) =>
                  showPlate ? (
                    <BookSqure
                      item={item}
                      title={item.title}
                      authors={item.authors}
                      id={item.id}
                      image={item.image}
                      rating={item.rating}
                      issueYear={item.issueYear}
                      booking={item.booking}
                      delivery={item.delivery}
                      key={item.id}
                      searchParam={searchParam}
                      orderBook={orderBook}
                      currentUserId={currentUserId}
                    />
                  ) : (
                    <BooksPlate
                      title={item.title}
                      authors={item.authors}
                      id={item.id}
                      image={item.image}
                      rating={item.rating}
                      issueYear={item.issueYear}
                      booking={item.booking}
                      delivery={item.delivery}
                      key={item.id}
                      searchParam={searchParam}
                      orderBook={orderBook}
                      currentUserId={currentUserId}
                    />
                  )
                )
              ) : finallBooks.length === 0 && searchParam !== '' ? (
                <div className='no-results' data-test-id='search-result-not-found'>
                  <div>По запросу ничего не найдено</div>
                </div>
              ) : (
                <div className='no-category' data-test-id='empty-category'>
                  <div>В этой категории книг ещё нет</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
