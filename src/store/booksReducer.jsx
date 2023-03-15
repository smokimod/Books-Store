/* eslint-disable unicorn/filename-case */
const GET_BOOKS = 'GET_BOOKS';
const GET_CURRENT_BOOK = 'GET_CURRENT_BOOK';
const LOADING_BOOKS = 'LOADING_BOOKS';
const ERROR_BOOKS = 'ERROR_BOOKS';
const CATEGORY_OF_BOOKS = 'CATEGORY_OF_BOOKS';

const initialState = {
  currentBook: [],
  books: [],
  comment: [],
  categories: [],
  loading: false,
  error: false,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, loading: false, books: action.payload.data };
    case LOADING_BOOKS:
      return { ...state, loading: true };
    case GET_CURRENT_BOOK:
      return { ...state, loading: false, currentBook: action.payload.data };
    case ERROR_BOOKS:
      return { ...state, loading: false, error: true };
    case CATEGORY_OF_BOOKS:
      return { ...state, loading: false, categories: action.payload.data };

    default:
      return state;
  }
};

export const getBooksRequest = (payload) => ({
  type: GET_BOOKS,
  payload,
});
export const loadingBooksRequest = (payload) => ({
  type: LOADING_BOOKS,
  payload,
});
export const errorBooksRequest = (payload) => ({
  type: ERROR_BOOKS,
  payload,
});
export const getCurrentBookRequest = (payload) => ({
  type: GET_CURRENT_BOOK,
  payload,
});
export const getCategoryBookRequest = (payload) => ({
  type: CATEGORY_OF_BOOKS,
  payload,
});
