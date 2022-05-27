// action types
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_FAILURE = 'REQUEST_API_FAILURE';
export const INCREASE_ASSERTIONS = 'INCREASE_ASSERTIONS';
export const INCREASE_SCORE = 'INCREASE_SCORE';

export const createPlayer = (value) => ({
  type: CREATE_PLAYER,
  payload: value,
});
export const increaseAssertions = (secodsAndDifficulty) => ({
  type: INCREASE_ASSERTIONS,
  payload: secodsAndDifficulty,
});
/* export const increaseScore = (value) => ({
  type: INCREASE_SCORE,
  payload: value,
}); */
