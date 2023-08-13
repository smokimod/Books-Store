/* eslint-disable no-negated-condition */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  CommentFetch as BookingRequest,
  DeleteOrderedBookRequest,
  ReOrderBookRequest,
} from '../../axios-create/instanse';
import {
  getBookingsReducer,
  getDeleteBookingsReducer,
  getErrorBookingsReducer,
  getReOrderReducer,
  getSuccesBookingsReducer,
  loadingBookingsReducer,
} from '../../store/bookingsReducer';
import { BooksSlice, CurrentBookSlice } from '../../store/books-slice';

import { CalendarLayout } from './calendar-layout';

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

export const OrderBookCalendar = ({ showCalendar, orderBook, setShowCalendar }) => {
  const customer = useSelector((state) => state.auth.userData.data.user.id);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateSelect, setSelectedDateSelect] = useState(new Date());
  const [activeDate, setActiveDate] = useState(false);

  useEffect(() => {
    const today = new Date();
    const selectDateToLocalDate = new Date(
      selectedDateSelect.setDate(selectedDateSelect.getDate())
    ).toLocaleDateString();
    const todayToLocalDate = new Date(today.setDate(today.getDate())).toLocaleDateString();

    const getDay = () => {
      if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6 || selectDateToLocalDate === todayToLocalDate)
        setActiveDate(true);
      else if (new Date(today).getTime() > new Date(selectedDate).getTime()) setActiveDate(true);
      else if (today.getDay() === 5 && selectedDate.getDay() !== 1) setActiveDate(true);
      else setActiveDate(false);
    };

    getDay();
  }, [activeDate, setActiveDate, selectedDate, selectedDateSelect]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setSelectedDateSelect(value);
  };
  const handleYearChange = (value) => value.getFullYear();

  const handleMonthChange = (value) => monthsArray[value.getMonth()];

  const BookingsRequest = (e) => {
    e.preventDefault();

    const currentBookInfo = JSON.parse(sessionStorage.getItem('bookID'));

    const data = {
      data: {
        dateOrder: selectedDate.toISOString(),
        book: currentBookInfo.id,
        customer,
        order: !currentBookInfo.booking,
      },
    };

    dispatch(loadingBookingsReducer());

    BookingRequest.post('/bookings', data)
      .then((results) => {
        localStorage.setItem('bookings', JSON.stringify(results.data));
        dispatch(getBookingsReducer(results));

        if (id) dispatch(CurrentBookSlice(id));
        else {
          dispatch(BooksSlice());
        }

        setShowCalendar(false);
        setTimeout(() => {
          dispatch(getSuccesBookingsReducer());
        }, 4000);
      })
      .catch(() => {
        dispatch(getErrorBookingsReducer(true));
        setShowCalendar(false);
        setTimeout(() => {
          dispatch(getErrorBookingsReducer(false));
        }, 4000);
      });
  };

  const BookingsDeleteRequest = (e) => {
    e.preventDefault();

    const currentBookInfo = JSON.parse(sessionStorage.getItem('bookID'));

    dispatch(loadingBookingsReducer());

    DeleteOrderedBookRequest.delete(`/bookings/${currentBookInfo.booking.id}`)
      .then(() => {
        localStorage.removeItem('bookings');
        setShowCalendar(false);
        dispatch(getDeleteBookingsReducer(true));

        if (id) dispatch(CurrentBookSlice(id));
        else {
          dispatch(BooksSlice());
        }

        setTimeout(() => {
          dispatch(getDeleteBookingsReducer(false));
        }, 4000);
      })
      .catch(() => {
        dispatch(getErrorBookingsReducer(true));
        setShowCalendar(false);
        setTimeout(() => {
          dispatch(getDeleteBookingsReducer(false));
        }, 4000);
      });
  };

  const BookingsReOrderRequest = (e) => {
    e.preventDefault();

    const currentBookInfo = JSON.parse(sessionStorage.getItem('bookID'));

    dispatch(loadingBookingsReducer());

    ReOrderBookRequest.put(`/bookings/${currentBookInfo.booking.id}`)
      .then((results) => {
        localStorage.setItem('deletedOrder', JSON.stringify(results.data));
        setShowCalendar(false);
        dispatch(getBookingsReducer(results));

        if (id) dispatch(CurrentBookSlice(id));
        else {
          dispatch(BooksSlice());
        }

        setTimeout(() => {
          dispatch(getReOrderReducer(true));
        }, 4000);
      })
      .catch(() => {
        dispatch(getErrorBookingsReducer(true));
        setShowCalendar(false);
        setTimeout(() => {
          dispatch(getReOrderReducer(false));
        }, 4000);
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
      BookingsDeleteRequest={BookingsDeleteRequest}
      BookingsReOrderRequest={BookingsReOrderRequest}
      selectedDateSelect={selectedDateSelect}
      customer={customer}
    />
  );
};
