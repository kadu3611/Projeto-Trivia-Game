import { CREATE_PLAYER, INCREASE_ASSERTIONS } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.hashEmail,
    };
  case INCREASE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
