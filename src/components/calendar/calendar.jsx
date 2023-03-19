import { useState } from 'react';

import cross from '../../icons/creset_icon.svg';

import { GetHeader } from './get-header.jsx/get-header';
import './calendar.scss';

export const Calendar = ({ showCalendar, orderBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  const getWeekDaysNames = () => {};
  const getDates = () => {};

  return (
    showCalendar && (
      <section className='calendar-layout' onClick={orderBook} role='presentation'>
        <div className='calendar-wapper'>
          <div className='calednar-container' onClick={(e) => e.stopPropagation()} role='presentation'>
            <button type='button' onClick={orderBook} className='cross-container'>
              <img src={cross} alt='cross' />
            </button>
            <h4>Выбор даты бронирования</h4>

            <div className='calendar'>
              <GetHeader />
            </div>
            <button type='button' className='btn-comment'>
              забронировать
            </button>
          </div>
        </div>
      </section>
    )
  );
};
