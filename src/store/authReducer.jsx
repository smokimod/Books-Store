/* eslint-disable unicorn/filename-case */
const GET_REGISTRATION_DATA = 'GET_REGISTRATION_DATA';
const LOADING_REGISTRATION_DATA = 'LOADING_REGISTRATION_DATA';
const ERROR_REGISTRATION_DATA = 'ERROR_REGISTRATION_DATA';

const initialState = {
  userData: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : [],
  loading: false,
  error: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTRATION_DATA:
      return { ...state, loading: false, userData: action.payload };
    case LOADING_REGISTRATION_DATA:
      return { ...state, loading: true };
    case ERROR_REGISTRATION_DATA:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const loadingAuthReducer = (payload) => ({
  type: LOADING_REGISTRATION_DATA,
  payload,
});
export const getErrorAuthReducer = (payload) => ({
  type: ERROR_REGISTRATION_DATA,
  payload,
});

export const getAuthReducer = (payload) => ({
  type: GET_REGISTRATION_DATA,
  payload,
});
