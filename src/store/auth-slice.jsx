import axios from 'axios';

import { getErrorAuthReducer, loadingAuthReducer } from './authReducer';

export const RestorePasswordSlice = (data) => async (dispatch) => {
  dispatch(loadingAuthReducer());
  try {
    await axios.post('https://library-cleverland-2jfze.ondigitalocean.app/auth/forgot-password', data);
  } catch (err) {
    dispatch(getErrorAuthReducer(err));
  }
};
