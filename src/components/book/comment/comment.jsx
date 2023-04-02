/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CommentFetch } from '../../../axios-create/instanse';
import emtyStar from '../../../icons/book-images/emptyStar_icon.svg';
import star from '../../../icons/book-images/start_icon.svg';
import cross from '../../../icons/creset_icon.svg';
import {
  errorCommentRequest,
  getCommentRequest,
  loadingCommentRequest,
  succesCommentRequest,
} from '../../../store/commentReducer';
import { Loader } from '../../loader';

import './comment.scss';

export const Comment = ({ showComment, handleShowComment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData.data.user.id);
  const loading = useSelector((state) => state.comment.loading);

  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(1);
  const [text, setText] = useState('');

  const postComment = (e) => {
    e.preventDefault();
    const data = {
      data: {
        rating,
        text,
        book: Number(id),
        user,
      },
    };

    handleShowComment(false);

    dispatch(loadingCommentRequest());
    CommentFetch.post('/comments', data)
      .then((results) => {
        localStorage.setItem('comment', JSON.stringify(results));
        dispatch(getCommentRequest(results));
        setTimeout(() => {
          dispatch(succesCommentRequest(false));
        }, 4000);
      })
      .catch((error) => {
        dispatch(errorCommentRequest(error));
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div
      className={showComment ? 'comment-layout' : 'comment-layout disabled'}
      role='presentation'
      onClick={handleShowComment}
    >
      <form className='comment-wrapper' role='presentation' onSubmit={postComment} onClick={(e) => e.stopPropagation()}>
        <div className='comment-container'>
          <h4>Оцените книгу </h4>
          <button type='button' onClick={handleShowComment} className='cross-container'>
            <img src={cross} alt='cross' />
          </button>
          <div className='your-estimate'>
            <p>Ваша оценка</p>
            <div>
              {[...Array(5)].map((__, index) => {
                index += 1;

                return (
                  <button
                    type='button'
                    className={index <= (hover || rating) ? 'btn-star on' : 'btn-star off'}
                    key={Number(Math.random() * index + 1)}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <img className='rating-start' src={star} alt={emtyStar} key={Math.random()} />
                  </button>
                );
              })}
            </div>
          </div>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            required={true}
            name='text'
            id='text'
            cols='30'
            rows='10'
            placeholder='Оставить отзыв'
            className='comment-area'
          />
          <button type='submit' className='btn-comment'>
            оценить
          </button>
        </div>
      </form>
    </div>
  );
};
