import { getToken } from '../../services/localStorage';

// action types
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_FAILURE = 'REQUEST_API_FAILURE';

export const createPlayer = (value) => ({
  type: CREATE_PLAYER,
  payload: value,
});

// actions referentes ao questions reducer
export const requestAPI = () => ({
  type: REQUEST_API,
});

export const requestAPISuccess = (questions) => ({
  type: REQUEST_API_SUCCESS,
  payload: questions,
});

export const requestAPIFailure = (error) => ({
  type: REQUEST_API_FAILURE,
  payload: error,
});

export const fetchQuestions = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const URL = `https://opentdb.com/api.php?amount=5&token=${getToken()}`;
    const response = await fetch(URL);
    const data = await response.json();
    dispatch(requestAPISuccess(data.results));
    return data.results;
  } catch (error) {
    dispatch(requestAPIFailure(error));
  }
};
