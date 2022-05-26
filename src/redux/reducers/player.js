import { CREATE_PLAYER, PLAY_ASSERTIONS } from '../actions/index';

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
  case PLAY_ASSERTIONS:
    console.log(action);
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
