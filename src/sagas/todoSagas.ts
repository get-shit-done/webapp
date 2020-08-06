import { put, takeLatest, call } from 'redux-saga/effects'
import axios from 'axios'
import { actions } from '../reducers/todos'
import { API_TODOS, API_TODOS_BY_ID } from '../api'

function* getTodos(data: any) {
  try {
    console.log('get todos', data)
    const response = yield call(axios.get, API_TODOS)
    yield put({ type: actions.getTodosSucceeded.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: actions.getTodosFailed.toString(), payload: error.message })
  }
}

export function* todoSagas() {
  yield takeLatest(actions.getTodosRequested.toString(), getTodos)
}
