import axios from 'axios';

import { getErrorAuthReducer, loadingAuthReducer } from './authReducer';

export const RestorePasswordSlice = (data) => async (dispatch) => {
  dispatch(loadingAuthReducer());
  try {
    await axios.post('https://strapi.cleverland.by/api/auth/forgot-password', data);
  } catch (err) {
    dispatch(getErrorAuthReducer(err));
  }
};
