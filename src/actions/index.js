import types from '~constants/index';

export const getDataFromServer = data => ({ type: types.SERVER_CALL, data });