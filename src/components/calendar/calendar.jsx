import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CommentFetch } from '../../axios-create/instanse';
import {
  getBookingsReducer,
  getErrorBookingsReducer,
  getSuccesBookingsReducer,
  loadingBookingsReducer,
} from '../../store/bookingsReducer';

import { CalendarLayout } from './calendar-layout';

export const OrderBookCalendar = ({ showCalendar, orderBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateSelect, setSelectedDateSelect] = useState(new Date());

  const [activeDate, setActiveDate] = useState(false);
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.auth.userData.data.user.id);

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
    setSelectedDateSelect(value.toISOString());
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
        customer,
        order: !info.booking,
      },
    };

    dispatch(loadingBookingsReducer());
    CommentFetch.post('/bookings', data)
      .then((results) => {
        localStorage.setItem('bookings', JSON.stringify(results.data));
        dispatch(getBookingsReducer(results));
        setTimeout(() => {
          dispatch(getSuccesBookingsReducer(false));
        }, 4000);
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
      selectedDateSelect={selectedDateSelect}
    />
  );
};
