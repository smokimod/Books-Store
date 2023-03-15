import { Link, useParams } from 'react-router-dom';

import altBookImage from '../../../../../icons/book-images/catAvatar_icon.svg';
import emtyStar from '../../../../../icons/book-images/emptyStar_icon.svg';
import star from '../../../../../icons/book-images/start_icon.svg';
import { HighLighter } from '../highlighter/highlighter';

import './books-squre.scss';

export const BookSqure = ({ title, authors, id, image, rating, issueYear, booking, delivery, searchParam }) => {
  const IMAGE_URL = 'https://strapi.cleverland.by';
  const { category } = useParams();

  return (
    <Link to={`/books/${category}/${id}`} key={id} id='card'>
      <div className='book-card' data-test-id='card'>
        <div className='book-wraper'>
          <div className='book-img-container'>
            <img
              className='book-img'
              loading='lazy'
              src={image ? `${IMAGE_URL}${image.url}` : altBookImage}
              alt={altBookImage}
            />
          </div>
          {rating ? (
            <div className='book-rating star'>
              {[0, 1, 2, 3, 4].map((__, index) => (
                <img src={index >= Math.round(rating) ? emtyStar : star} alt={star} key={Math.random()} />
              ))}
            </div>
          ) : (
            <div className='book-rating'>ещё нет отзывов</div>
          )}

          <p className='subtitle'>
            <HighLighter text={title} highlight={searchParam} highlightedItemClass='highlight' />
          </p>
          <div className='book-autor'>
            {authors}, {issueYear}
          </div>
          <button
            id={booking ? booking?.id : delivery ? delivery?.id : ''}
            type='button'
            className={booking?.order ? 'order booking' : delivery?.handed ? 'order delivery' : 'order'}
          >
            {booking?.order ? `Занята до ${booking.dateOrder}` : delivery?.handed ? 'Забронировна' : 'Забронировать'}
          </button>
        </div>
      </div>
    </Link>
  );
};
