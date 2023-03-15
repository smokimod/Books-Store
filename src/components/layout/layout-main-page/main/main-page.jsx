import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Loader } from '../../../loader';
import { BooksPlate } from '../main-books/books-plate';
import { BookSqure } from '../main-books/books-squre';

import { PlateSqureButtoms } from './plate-squre-buttoms/plate-squre-buttoms';
import { SearchField } from './search-field/search-field';

import './main-page.scss';

export const MainPage = () => {
  const books = useSelector((state) => state.books.books);
  const error = useSelector((state) => state.books.error);
  const loading = useSelector((state) => state.books.loading);
  const categories = useSelector((state) => state.books.categories);
  const { category } = useParams();

  const [showSeacthBar, setShowSeacthBar] = useState(false);
  const [showPlate, setShowPlate] = useState(true);
  const [sortByRating, setSortByRating] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const chooseCategoryByName = categories.find((item) => item.path === category);

  const toggleShowBar = () => (window.innerWidth <= 320 ? setShowSeacthBar(!showSeacthBar) : 'disabled');

  const finallBooks = useMemo(() => {
    const filterByCategory =
      category === 'all' ? books : books.filter((item) => item.categories.includes(chooseCategoryByName.name));

    const sortByName = filterByCategory.filter((item) => item.title.toLowerCase().includes(searchParam.toLowerCase()));

    const sort = sortByName.sort((a, b) => (sortByRating ? a.rating - b.rating : b.rating - a.rating));

    return sort;
  }, [category, searchParam, books, chooseCategoryByName, sortByRating]);

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
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
