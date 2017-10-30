import { combineReducers } from 'redux';
import types from '~constants/index';

const defaultState = {
  data: {}
};

const testReducer = (state = defaultState, action) => {

  switch (action.type) {
    case types.SERVER_CALL_SUCCESS:

      return Object.assign({}, state, {
        users: action.data
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
