import arrow_down from '../../../icons/order-book/icon-arrow-down.svg';
import arrow_up from '../../../icons/order-book/icon-arrow-up.svg';

export const GetHeader = () => {
  const today = new Date();
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
  const defaultValue = monthsArray[today.getMonth()];

  return (
    <div className='header'>
      <label htmlFor='months'>
        <select name='months' id='months' defaultValue={defaultValue} className='chosen-month'>
          {monthsArray.map((item) => (
            <option value={item} key={Math.random()}>{`${item} ${today.getFullYear()}`}</option>
          ))}
        </select>
      </label>
      <div>
        <button type='button' className='arrow-up'>
          <img src={arrow_up} alt='arrow' />
        </button>
        <button type='button' className='arrow-down'>
          <img src={arrow_down} alt='arrow' />
        </button>
      </div>
    </div>
  );
};
