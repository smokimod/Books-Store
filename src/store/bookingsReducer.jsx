/* eslint-disable unicorn/filename-case */

const GET_BOOKINGS = 'GET_BOOKINGS';
const LOADING_BOOKINGS_DATA = 'LOADING_BOOKINGS_DATA';
const ERROR_BOOKINGS_DATA = 'ERROR_REGISTRATION_DATA';
const SUCCES_DATA = 'SUCCES_DATA';
const DELETE_DATA = 'DELETE_DATA';
const REORDER_BOOKINGS_DATA = 'REORDER_BOOKINGS_DATA';

const initialState = {
  bookings: localStorage.getItem('bookings') ? JSON.parse(localStorage.getItem('bookings')) : {},
  loading: false,
  error: false,
  succes: false,
  delete: false,
  reOrder: false,
};

export const BookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return { ...state, loading: false, bookings: action.payload, succes: true };
    case LOADING_BOOKINGS_DATA:
      return { ...state, loading: true };
    case ERROR_BOOKINGS_DATA:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SUCCES_DATA:
      return { ...state, succes: action.payload, loading: false };
    case DELETE_DATA:
      return { ...state, delete: action.payload, loading: false, bookings: {} };
    case REORDER_BOOKINGS_DATA:
      return { ...state, reOrder: action.payload, loading: false };
    default:
      return state;
  }
};

export const loadingBookingsReducer = (payload) => ({
  type: LOADING_BOOKINGS_DATA,
  payload,
});
export const getErrorBookingsReducer = (payload) => ({
  type: ERROR_BOOKINGS_DATA,
  payload,
});

export const getBookingsReducer = (payload) => ({
  type: GET_BOOKINGS,
  payload,
});
export const getSuccesBookingsReducer = (payload) => ({
  type: SUCCES_DATA,
  payload,
});
export const getDeleteBookingsReducer = (payload) => ({
  type: DELETE_DATA,
  payload,
});
export const getReOrderReducer = (payload) => ({
  type: REORDER_BOOKINGS_DATA,
  payload,
});
