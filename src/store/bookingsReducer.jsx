/* eslint-disable unicorn/filename-case */

const GET_BOOKINGS = 'GET_BOOKINGS';
const LOADING_BOOKINGS_DATA = 'LOADING_BOOKINGS_DATA';
const ERROR_BOOKINGS_DATA = 'ERROR_REGISTRATION_DATA';

const initialState = {
  bookings: localStorage.getItem('bookings') ? JSON.parse(localStorage.getItem('bookings')) : [],
  loading: false,
  error: false,
};

export const BookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return { ...state, loading: false, bookings: action.payload };
    case LOADING_BOOKINGS_DATA:
      return { ...state, loading: true };
    case ERROR_BOOKINGS_DATA:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
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
