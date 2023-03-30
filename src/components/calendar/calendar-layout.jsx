import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';

import cross from '../../icons/creset_icon.svg';
import { Loader } from '../loader';

import './calendar.scss';
import './Calender.css';

export const CalendarLayout = ({
  showCalendar,
  orderBook,
  handleDateChange,
  handleYearChange,
  handleMonthChange,
  selectedDate,
  activeDate,
  BookingsRequest,
  selectedDateSelect,
}) => {
  const loading = useSelector((state) => state.orderBook.loading);
  const isOrderByUser = JSON.parse(localStorage.getItem('bookings'));
  const isOrderBySomeone = JSON.parse(sessionStorage.getItem('bookID'));
  const disableBtn =
    activeDate ||
    selectedDateSelect === isOrderByUser?.attributes?.dateOrder ||
    isOrderBySomeone?.booking ||
    !showCalendar;

  return (
    (loading && <Loader />) || (
      <section
        className={showCalendar ? 'calendar-layout' : 'calendar-layout disable'}
        onClick={orderBook}
        role='presentation'
      >
        <div className='calendar-wrapper'>
          <div className='calednar-container' onClick={(e) => e.stopPropagation()} role='presentation'>
            <button type='button' onClick={orderBook} className='cross-container'>
              <img src={cross} alt='cross' />
            </button>
            <h4>
              {isOrderBySomeone && isOrderBySomeone.booking ? 'Выбор даты бронирования' : 'Изменения даты бронирования'}
            </h4>
            <div className='calendar'>
              <Calendar
                onClickMonth={handleMonthChange}
                onClickYear={handleYearChange}
                onChange={handleDateChange}
                value={selectedDate}
                showFixedNumberOfWeeks={false}
                minDetail='month'
                maxDetail='month'
                defaultView='year'
                className='react-calendar'
              />
            </div>
            <button
              type='button'
              className={disableBtn ? 'btn-comment disabled' : 'btn-comment '}
              disabled={disableBtn}
              onClick={BookingsRequest}
            >
              забронировать
            </button>
            {isOrderBySomeone?.delivery && (
              <button type='button' className='btn-comment cancel'>
                отменить бронь
              </button>
            )}
          </div>
        </div>
      </section>
    )
  );
};
