import crossIcon from '../../../../../icons/creset_icon.svg';
import SearchIcon from '../../../../../icons/glass_320_icon.svg';

import './search-field.scss';

export const SearchField = ({
  setSearchParam,
  searchParam,
  showSeacthBar,
  toggleShowBar,
  sortByRating,
  setSortByRating,
}) => (
  <div className='search-container'>
    <div className={showSeacthBar ? 'search-input-container show' : 'search-input-container'}>
      <input
        className={showSeacthBar ? 'search-autor show' : 'search-autor'}
        placeholder='Поиск книги или автора…'
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        data-test-id='input-search'
      />

      {showSeacthBar ? (
        <button type='button' className='cross-button' data-test-id='button-search-close'>
          <img src={crossIcon} alt='cross-icon' onClick={toggleShowBar} role='presentation' />
        </button>
      ) : (
        <button type='button' className='search-button' onClick={toggleShowBar} data-test-id='button-search-open'>
          <img src={SearchIcon} alt='cross-icon' />
        </button>
      )}
    </div>

    <label
      htmlFor='btn-raiting'
      className={showSeacthBar ? 'icon-rating disable' : sortByRating ? 'icon-rating toggle' : 'icon-rating'}
    >
      <button
        onClick={() => setSortByRating(!sortByRating)}
        type='button'
        className='btn-raiting'
        data-test-id='sort-rating-button'
      >
        По рейтингу
      </button>
    </label>
  </div>
);
