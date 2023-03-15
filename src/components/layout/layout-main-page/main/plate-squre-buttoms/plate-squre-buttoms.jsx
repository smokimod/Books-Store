import { useEffect, useRef } from 'react';

import activePlateIcon from '../../../../../icons/buttons/button_plate_active.svg';
import activeSqureIcon from '../../../../../icons/buttons/button_suqare_active.svg';
import plateIcon from '../../../../../icons/buttons/plate.svg';
import squreIcon from '../../../../../icons/buttons/squre-icon.svg';

import './plate-squre-buttoms.scss';

export const PlateSqureButtoms = ({ showSeacthBar, showPlate, setShowPlate }) => {
  const buttonAutoFocus = useRef(null);

  useEffect(() => {
    if (buttonAutoFocus.current) {
      buttonAutoFocus.current.focus();
    }
  }, [buttonAutoFocus]);

  return (
    <div className={showSeacthBar ? 'view-of-books disable' : 'view-of-books'}>
      <button
        data-test-id='button-menu-view-window'
        type='button'
        className={`btnSqure ${showPlate ? 'active' : ''}`}
        ref={buttonAutoFocus}
        onClick={() => setShowPlate(true)}
      >
        <img src={showPlate ? activeSqureIcon : squreIcon} alt='squreIcon' />
      </button>
      <button
        type='button'
        data-test-id='button-menu-view-list'
        className={`btnLine ${showPlate ? '' : 'active'}`}
        onClick={() => setShowPlate(!true)}
      >
        <img className='btn-plate' src={showPlate ? plateIcon : activePlateIcon} alt='plateIcon' />
      </button>
    </div>
  );
};
