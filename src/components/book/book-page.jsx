import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CategoryOfBooksSlice, CurrentBookSlice } from '../../store/books-slice';
import { OrderBookCalendar } from '../calendar/calendar';
import { AlertCase } from '../error-case/error-case';
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
  const [showCalendar, setShowCalendar] = useState(false);

  const { loading, currentBook, categories, error } = useSelector((state) => state.books);
  const { commentError, successComment } = useSelector((state) => state.comment);

  const { successOrder, deleteOrder, reOdrerBook, orderStatusError } = useSelector((state) => state.orderBook);

  const conditionsAlertWindow =
    successOrder || deleteOrder || reOdrerBook || orderStatusError || commentError || successComment;

  const orderStatus = currentBook?.booking?.order
    ? `Занята до ${new Date(currentBook?.booking.dateOrder).toLocaleDateString()}`
    : currentBook?.delivery?.handed
    ? 'Забронированно'
    : 'Забронировать';

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

  const orderBook =  (e) => {
    e.preventDefault();

    sessionStorage.setItem('bookID', JSON.stringify(currentBook));

    if (sessionStorage.getItem('bookID') === 'undefined') {
      sessionStorage.removeItem('bookID');
    }

    setShowCalendar(!showCalendar);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='book-container'>
      <BreadCrumbs title={currentBook.title} />
      {conditionsAlertWindow ? (
        <AlertCase
          text='Спасибо, что нашли время оценить книгу!'
          successOrder={successOrder}
          deleteOrder={deleteOrder}
          reOdrerBook={reOdrerBook}
          successComment={successComment}
          commentError={commentError}
          orderStatusError={orderStatusError}
        />
      ) : null}
      {error ? null : (
        <div className='book-holder'>
          <OrderBookCalendar showCalendar={showCalendar} orderBook={orderBook} setShowCalendar={setShowCalendar} />

          <section className='book-page'>
            <div className='book-name'>
              <div className='book-information'>
                <BookSlider images={currentBook.images} />
              </div>
              <div className='detail-head'>
                <h3 data-test-id='book-title'>{currentBook.title}</h3>
                <div className='book-subtitle'>
                  {currentBook.authors}, {currentBook.issueYear}
                </div>
                <button
                  onClick={(e) => orderBook(e, currentBook)}
                  type='button'
                  className={
                    currentBook.booking?.order
                      ? 'order-book-btn booking'
                      : currentBook?.delivery?.handed
                      ? 'order-book-btn delivery'
                      : 'order-book-btn'
                  }
                >
                  {orderStatus}
                </button>
              </div>
              <div className='book-about'>
                <div>
                  <h5>О книге</h5>
                </div>
                <p className='description-item'>{currentBook.description}</p>
              </div>
            </div>

            <div className='book-summary'>
              <Comment showComment={showComment} handleShowComment={handleShowComment} />
              <BookRating rating={currentBook.rating} />
              <AdditionalInfoBook />
              <BookComents comments={currentBook.comments} handleShowComment={handleShowComment} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
