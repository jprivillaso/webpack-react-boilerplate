import { put, all, takeEvery } from 'redux-saga/effects';

// Action Types
import types from '~constants/index';

function* testSaga({ payload }) {
  try {
    yield put({ type: types.SERVER_CALL_SUCCESS, data: payload });
  } catch (error) {
    yield put({ type: types.SERVER_CALL_FAILURE, error });
  }
}

export default function* rootSaga() {
  try {
    yield all([
      takeEvery(types.SERVER_CALL, testSaga),
    ]);
  } catch (error) {
    console.error(error);
  }
}
