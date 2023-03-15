import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from './authReducer';
import { booksReducer } from './booksReducer';
import { BurgerMenuReducer } from './burger-menu-reducer';
import { CommentReducer } from './commentReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burger: BurgerMenuReducer,
  comments: BurgerMenuReducer,
  books: booksReducer,
  auth: authReducer,
  comment: CommentReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
