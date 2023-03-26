import { useDispatch, useSelector } from 'react-redux';

import { CommentFetch } from '../../axios-create/instanse';
import { getBookingsReducer, getErrorBookingsReducer, loadingBookingsReducer } from '../../store/bookingsReducer';

export const BookingsRequest = (e, data) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData.data.user.id);

  e.preventDefault();

  dispatch(loadingBookingsReducer());
  CommentFetch('/bookings', data)
    .then((results) => {
      localStorage.setItem('bookings', JSON.stringify(results));
      dispatch(getBookingsReducer(results));
    })
    .catch((error) => {
      dispatch(getErrorBookingsReducer(error));
    });
};
