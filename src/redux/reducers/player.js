import { CREATE_PLAYER } from '../actions/index';

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
  default:
    return state;
  }
};

export default playerReducer;
