import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CategoryOfBooksSlice, CurrentBookSlice } from '../../store/books-slice';
import { Loader } from '../loader';

import { AdditionalInfoBook } from './additional-info-book/additional-info-book';
import { BookComents } from './book-coments/book-coments';
import { BookRating } from './book-rating/book-rating';
import { BookSlider } from './book-slider/book-slider';
import { BreadCrumbs } from './bread-crumbs/bread-crumbs';
import { Comment } from './comment/comment';

import './book-page.scss';

export const BookPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showComment, setShowComment] = useState(false);
  const loading = useSelector((state) => state.books.loading);
  const currentBook = useSelector((state) => state.books.currentBook);
  const categories = useSelector((state) => state.books.categories);
  const error = useSelector((state) => state.books.error);

  const { authors, description, issueYear, title, booking, delivery, images, rating, comments } = currentBook;

  useEffect(() => {
    const getBookRequestById = async () => {
      await dispatch(CurrentBookSlice(id));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      categories.length > 0 ? null : await dispatch(CategoryOfBooksSlice());
    };

    getBookRequestById();
  }, [id, dispatch, categories]);

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='book-container'>
      <BreadCrumbs title={title} />
      {error ? null : (
        <div className='book-holder'>
          <section className='book-page'>
            <div className='book-name'>
              <div className='book-information'>
                <BookSlider images={images} />
              </div>
              <div className='detail-head'>
                <h3 data-test-id='book-title'>{title}</h3>
                <div className='book-subtitle'>
                  {authors}, {issueYear}
                </div>
                <button
                  type='button'
                  className={
                    booking?.order
                      ? 'order-book-btn booking'
                      : delivery?.handed
                      ? 'order-book-btn delivery'
                      : 'order-book-btn'
                  }
                >
                  {booking?.order ? booking?.dateOrder : delivery?.handed ? 'Забронированно' : 'Забронировать'}
                </button>
              </div>
              <div className='book-about'>
                <div>
                  <h5>О книге</h5>
                </div>
                <p className='description-item'>{description}</p>
              </div>
            </div>

            <div className='book-summary'>
              <Comment showComment={showComment} handleShowComment={handleShowComment} />
              <BookRating rating={rating} />
              <AdditionalInfoBook />
              <BookComents comments={comments} handleShowComment={handleShowComment} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
