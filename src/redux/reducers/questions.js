import { REQUEST_API, REQUEST_API_FAILURE, REQUEST_API_SUCCESS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  error: '',
  questions: [],
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isFetching: true };
  case REQUEST_API_SUCCESS:
    return { ...state, questions: action.payload, isFetching: false };
  case REQUEST_API_FAILURE:
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
};

export default questionsReducer;
