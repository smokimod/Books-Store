/* eslint-disable unicorn/filename-case */

const COMMENT_DATA = 'COMMENT_DATA';
const LOADING_COMMENT = 'LOADING_COMMENT';
const ERROR_COMMENT = 'ERROR_COMMENT';

const initialState = {
  comment: [],
  loading: false,
  error: false,
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.payload) {
    case LOADING_COMMENT:
      return { ...state, loading: true };
    case COMMENT_DATA:
      return { ...state, loading: false, comment: action.payload };
    case ERROR_COMMENT:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const getCommentRequest = (payload) => ({
  type: COMMENT_DATA,
  payload,
});
export const loadingCommentRequest = (payload) => ({
  type: LOADING_COMMENT,
  payload,
});
export const errorCommentRequest = (payload) => ({
  type: ERROR_COMMENT,
  payload,
});
