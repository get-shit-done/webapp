import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* fetchUser() {
   try {
      const response = yield call(axios.get, 'http://localhost:3333/login');
      yield put({type: "USER_FETCH_SUCCEEDED", response});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* apiTestSagas() {
  yield takeLatest('todos/apiGet', fetchUser);
}

export { apiTestSagas };
