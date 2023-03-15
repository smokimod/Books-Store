/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import emtyStar from '../../../icons/book-images/emptyStar_icon.svg';
import star from '../../../icons/book-images/start_icon.svg';
import cross from '../../../icons/creset_icon.svg';
import { CommentSlice } from '../../../store/books-slice';
import { Loader } from '../../loader';

import './comment.scss';

export const Comment = ({ showComment, handleShowComment }) => {
  const { register, handleSubmit, reset } = useForm({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData.data.user.id);
  const loading = useSelector((state) => state.comment.loading);
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(1);

  const onSubmit = async (data) => {
    const obj = { ...data, book: id, rating, user };

    await dispatch(CommentSlice(obj));
    showComment(false);
    reset();
  };

  return (
    <React.Fragment>
      {loading ? <Loader /> : null}
      <div
        className={showComment ? 'comment-layout' : 'comment-layout disabled'}
        role='presentation'
        onClick={handleShowComment}
      >
        <form
          className='comment-wrapper'
          role='presentation'
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
        >
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
              {...register('text', {
                required: true,
              })}
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
    </React.Fragment>
  );
};
