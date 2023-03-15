import axios from 'axios';

import { errorCommentRequest, getCommentRequest, loadingCommentRequest } from './commentReducer';

export const CommentSlice = (data) => async (dispatch) => {
  dispatch(loadingCommentRequest());
  try {
    const bookSearchRequest = await axios.post('https://strapi.cleverland.by/api/comments', data);

    await dispatch(getCommentRequest(bookSearchRequest));
  } catch (err) {
    dispatch(errorCommentRequest(err));
  }
};
