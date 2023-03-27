/* eslint-disable unicorn/filename-case */

const COMMENT_DATA = 'COMMENT_DATA';
const LOADING_COMMENT = 'LOADING_COMMENT';
const ERROR_COMMENT = 'ERROR_COMMENT';
const SUCCES_DISPLAY = 'SUCCES_DISPLAY';

const initialState = {
  comment: {},
  loading: false,
  error: false,
  success: false,
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_COMMENT:
      return { ...state, loading: true };
    case COMMENT_DATA:
      return { ...state, loading: false, comment: action.payload, success: true };
    case ERROR_COMMENT:
      return { ...state, loading: false, error: true, success: false };
    case SUCCES_DISPLAY:
      return { ...state, success: false };
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
export const succesCommentRequest = (payload) => ({
  type: SUCCES_DISPLAY,
  payload,
});
