import { combineReducers } from 'redux';
import player from './player';
import askings from './questions';

const rootReducer = combineReducers({ player, askings });

export default rootReducer;
