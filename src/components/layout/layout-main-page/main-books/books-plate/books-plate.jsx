import { Link, useParams } from 'react-router-dom';

import altBookImage from '../../../../../icons/book-images/catAvatar_icon.svg';
import emtyStar from '../../../../../icons/book-images/emptyStar_icon.svg';
import star from '../../../../../icons/book-images/start_icon.svg';
import { HighLighter } from '../highlighter/highlighter';

import './books-plate.scss';

export const BooksPlate = ({
  title,
  authors,
  id,
  image,
  rating,
  issueYear,
  booking,
  delivery,
  searchParam,
  orderBook,
}) => {
  const IMAGE_URL = 'https://strapi.cleverland.by';
  const { category } = useParams();
  const stars = [...Array(5)].map((__, index) => (
    <img src={index >= Math.round(rating) ? emtyStar : star} alt={star} key={Math.random()} />
  ));
  const bookId = booking ? booking?.id : delivery ? delivery?.id : '';
  const bookOrderStatusStyle =
    !booking && !delivery
      ? 'order'
      : booking?.customerId === currentUserId
      ? 'order delivery'
      : delivery
      ? 'order booking'
      : 'order booking';
  const bookOrderStatusText =
    !booking && !delivery
      ? 'Забронировать'
      : booking?.customerId === currentUserId
      ? 'Забронировна'
      : delivery && !booking
      ? `Занята до ${new Date(delivery?.dateHandedTo).toLocaleDateString()}`
      : 'Забронировна';

  return (
    <Link to={`/books/${category}/${id}`} key={id}>
      <div className='plate' data-test-id='card'>
        <div className='plate-container'>
          <div className='plate-img-container'>
            <img className='plate-img' src={image ? `${IMAGE_URL}${image.url}` : altBookImage} alt={altBookImage} />
          </div>
          <div className='plate-book-info'>
            <div className='book-info'>
              <h4>
                <HighLighter text={title} highlight={searchParam} highlightedItemClass='highlight' />
              </h4>
              <div className='plate-book-autor'>
                {authors}, {issueYear}
              </div>
            </div>
            <div className='plate-order'>
              {rating ? (
                <div className='book-rating star'>{stars}</div>
              ) : (
                <div className='book-rating'>ещё нет отзывов</div>
              )}
              <button onClick={orderBook} id={bookId} type='button' className={bookOrderStatusStyle}>
                {bookOrderStatusText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
