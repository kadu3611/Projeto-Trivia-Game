export const CREATE_PLAYER = 'CREATE_PLAYER';

export const createPlayer = (value) => ({
  type: CREATE_PLAYER,
  payload: value,
});
