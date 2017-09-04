import { combineReducers } from 'redux';
import types from '~constants/index';

const testReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SERVER_CALL_SUCCESS:
      return Object.assign({}, state, {
        server_response: action.data
      });
    case types.SERVER_CALL_FAILURE:
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: testReducer
});

export default rootReducer;
