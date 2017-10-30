import { put, all, takeEvery, call } from 'redux-saga/effects';

// Action Types
import types from '~constants/index';

// Services
import { getUserList } from '~services/data_service';

function* testSaga() {
  try {

    const data = yield call(getUserList);
    yield put({ type: types.SERVER_CALL_SUCCESS, data });

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
