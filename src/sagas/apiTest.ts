import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { actions } from '../reducers/todos';

function* fetchUser() {
   try {
      const response = yield call(axios.get, 'http://localhost:3333/login');
      yield put({type: actions.apiSuccess.toString(), payload: response.data });
   } catch (e) {
      yield put({type: actions.apiFail.toString(), payload: e.message});
   }
}

function* apiTestSagas() {
  yield takeLatest(actions.apiGet.toString(), fetchUser);
}

export { apiTestSagas };
