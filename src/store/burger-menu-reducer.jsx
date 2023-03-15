const CLOSE_GURGER = 'ClOSE_BURGER';
const OPEN_BURGER = 'OPEN_BURGER';

const initialState = {
  isBurger: false,
};

export const BurgerMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_BURGER:
      return { ...state, isBurger: true };
    case CLOSE_GURGER:
      return { ...state, isBurger: false };

    default:
      return state;
  }
};
