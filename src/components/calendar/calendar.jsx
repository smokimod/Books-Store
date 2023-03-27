import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CommentFetch } from '../../axios-create/instanse';
import { getBookingsReducer, getErrorBookingsReducer, loadingBookingsReducer } from '../../store/bookingsReducer';

import { CalendarLayout } from './calendar-layout';

export const OrderBookCalendar = ({ showCalendar, orderBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData.data.user.id);

  useEffect(() => {
    const today = new Date();
    const getDay = () => {
      if (selectedDate.getDay() === 0) setActiveDate(true);
      else if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) setActiveDate(true);
      else setActiveDate(false);
    };

    getDay();
  }, [activeDate, setActiveDate, selectedDate]);

  const monthsArray = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  const handleYearChange = (value) => value.getFullYear();

  const handleMonthChange = (value) => monthsArray[value.getMonth()];

  const BookingsRequest = (e) => {
    e.preventDefault();
    const info = JSON.parse(sessionStorage.getItem('bookID'));

    const data = {
      data: {
        dateOrder: selectedDate.toISOString(),
        book: info.id,
        user,
        order: info.booking.order,
      },
    };
    console.log(info);

    dispatch(loadingBookingsReducer());
    CommentFetch.post('/bookings', data)
      .then((results) => {
        localStorage.setItem('bookings', JSON.stringify(results));

        dispatch(getBookingsReducer(results));
      })
      .catch((error) => {
        dispatch(getErrorBookingsReducer(error));
      });
  };

  return (
    <CalendarLayout
      showCalendar={showCalendar}
      orderBook={orderBook}
      handleDateChange={handleDateChange}
      handleYearChange={handleYearChange}
      handleMonthChange={handleMonthChange}
      selectedDate={selectedDate}
      activeDate={activeDate}
      BookingsRequest={BookingsRequest}
    />
  );
};
