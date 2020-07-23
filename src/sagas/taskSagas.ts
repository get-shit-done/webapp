import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { API_GET_TASKS } from '../api'
import { actions } from '../reducers/calendar'

function* fetchTasks() {
  try {
    const response = yield call(axios.get, API_GET_TASKS)
    yield put({ type: actions.getTasksSuccess.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: actions.getTasksFail.toString(), payload: error.message })
  }
}

function* taskSagas() {
  yield takeLatest(actions.getTasks.toString(), fetchTasks)
}

export { taskSagas }
