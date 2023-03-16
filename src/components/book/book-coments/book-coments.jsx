import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import emtyStar from '../../../icons/book-images/emptyStar_icon.svg';
import star from '../../../icons/book-images/start_icon.svg';
import userIcon from '../../../icons/comment_icon.svg';
import { CommentDate } from '../comment-date/comment-date';

import './book-coments.scss';

export const BookComents = ({ comments = [], handleShowComment }) => {
  const [showComments, setShownComments] = useState(false);
  const userId = useSelector((state) => state.auth.userData.data.user.id);
  const [date] = comments;

  const find = comments.find((item) => item.user.commentUserId === userId);

  const commentList = useMemo(() => {
    const sort = comments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    return sort;
  }, [comments]);

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
          {comments.length >= 1
            ? commentList.map((item) => (
                <div className='comment one' key={item.id}>
                  <div className='user-name-data' id={item.user.commentUserId}>
                    <div>
                      <img src={item.user.avatarUrl || userIcon} alt={userIcon} />
                    </div>
                    <div className='name-date'>
                      <div>{item.user.firstName}</div>
                      <div>{item.user.lastName}</div>
                      <CommentDate date={date} />
                    </div>
                  </div>
                  <div className='bookItem-rating-star'>
                    {item.rating
                      ? [...Array(5)].map((__, index) => (
                          <img
                            className='rating-start'
                            src={index >= Math.round(item.rating) ? emtyStar : star}
                            alt={star}
                            key={Math.random()}
                          />
                        ))
                      : [...Array(5)].map(() => (
                          <img className='rating-start' src={emtyStar} alt='emtyStar' key={Math.random()} />
                        ))}
                  </div>
                  <div className='word'>{item.text}</div>
                </div>
              ))
            : null}
        </div>
      ) : null}
      <button
        data-test-id='button-rating'
        type='button'
        className={find ? 'set-a-comment disabled' : 'set-a-comment'}
        onClick={handleShowComment}
        disabled={find ? true : false}
      >
        оценить книгу
      </button>
    </div>
  );
};
