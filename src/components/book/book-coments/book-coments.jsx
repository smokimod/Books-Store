import { useState } from 'react';

import emtyStar from '../../../icons/book-images/emptyStar_icon.svg';
import star from '../../../icons/book-images/start_icon.svg';
import userIcon from '../../../icons/comment_icon.svg';

import './book-coments.scss';

export const BookComents = ({ comments = [], handleShowComment }) => {
  const [showComments, setShownComments] = useState(false);

  return (
    <div className='book-coments'>
      <div className='comments-head'>
        <div className='show-comments'>
          <h5>
            Отзывы <span>{comments && comments?.length}</span>{' '}
          </h5>
          <div
            onClick={() => setShownComments(!showComments)}
            role='presentation'
            className={showComments ? 'show-comments-icon toggle' : 'show-comments-icon'}
            data-test-id='button-hide-reviews'
          />
        </div>
      </div>
      {showComments ? (
        <div className='feed-back'>
          {comments && comments.length >= 1
            ? comments.map((item) => (
                <div className='comment one' key={item.id}>
                  <div className='user-name-data' id={item.user.commentUserId}>
                    <div>
                      <img src={item.user.avatarUrl || userIcon} alt={userIcon} />
                    </div>
                    <div className='name-date'>
                      <div>{item.user.firstName}</div>
                      <div>{item.user.lastName}</div>
                    </div>
                  </div>
                  <div className='bookItem-rating-star'>
                    {item.rating
                      ? [0, 1, 2, 3, 4].map((__, index) => (
                          <img
                            className='rating-start'
                            src={index >= Math.round(item.rating) ? emtyStar : star}
                            alt={star}
                            key={Math.random()}
                          />
                        ))
                      : [0, 1, 2, 3, 4].map(() => (
                          <img className='rating-start' src={emtyStar} alt='emtyStar' key={Math.random()} />
                        ))}
                  </div>
                  <div className='word'>{item.text}</div>
                </div>
              ))
            : null}
        </div>
      ) : null}
      <button data-test-id='button-rating' type='button' className='set-a-comment' onClick={handleShowComment}>
        оценить книгу
      </button>
    </div>
  );
};
