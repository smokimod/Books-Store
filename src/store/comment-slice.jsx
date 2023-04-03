import axios from 'axios';

import { errorCommentRequest, getCommentRequest, loadingCommentRequest, succesCommentRequest } from './commentReducer';

export const CommentSlice = (data) => async (dispatch) => {
  dispatch(loadingCommentRequest());
  try {
    const bookSearchRequest = await axios.post('https://strapi.cleverland.by/api/comments', data);

    dispatch(succesCommentRequest(true));
    await dispatch(getCommentRequest(bookSearchRequest));
  } catch {
    dispatch(errorCommentRequest(true));
    setTimeout(() => {
      dispatch(errorCommentRequest(false));
    }, 4000);
  }
};
