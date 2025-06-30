import { combineReducers } from '@reduxjs/toolkit';
import cards from './cardsSlice';

const reducer = combineReducers({
  cards,
});

export default reducer;
