import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import cross from '../../icons/creset_icon.svg';

import './calendar.scss';
import './Calender.css';

export const OrderBookCalendar = ({ showCalendar, orderBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(false);

  useEffect(() => {
    const today = new Date();
    console.log(today.setDate(today.getDate() + 1));
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

  return (
    showCalendar && (
      <section className='calendar-layout' onClick={orderBook} role='presentation'>
        <div className='calendar-wrapper'>
          <div className='calednar-container' onClick={(e) => e.stopPropagation()} role='presentation'>
            <button type='button' onClick={orderBook} className='cross-container'>
              <img src={cross} alt='cross' />
            </button>
            <h4>Выбор даты бронирования</h4>

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
              className={activeDate ? 'btn-comment disabled' : 'btn-comment '}
              disabled={activeDate}
            >
              забронировать
            </button>
          </div>
        </div>
      </section>
    )
  );
};
