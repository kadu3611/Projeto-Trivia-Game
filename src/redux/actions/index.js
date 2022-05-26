// action types
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_FAILURE = 'REQUEST_API_FAILURE';

export const createPlayer = (value) => ({
  type: CREATE_PLAYER,
  payload: value,
});
