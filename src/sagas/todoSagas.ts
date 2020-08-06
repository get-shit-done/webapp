import { put, takeLatest, takeEvery, call } from 'redux-saga/effects'
import axios from 'axios'
import { actions } from '../reducers/todos'
import { API_TODOS, API_TODOS_BY_ID } from '../api'

const payloadError = ({ _id, error }: { _id: string; error: string }) => ({ _id, error })

function* getTodos() {
  try {
    const response = yield call(axios.get, API_TODOS)
    yield put({ type: actions.getTodosSucceeded.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.getTodosFailed.toString(), payload: error.message })
  }
}
function* addTodo({ payload }: any) {
  try {
    const response = yield call(axios.post, API_TODOS, payload)
    yield put({ type: actions.addTodoSucceeded.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.addTodoFailed.toString(), payload: error.message })
  }
}
function* removeTodo({ payload }: any) {
  try {
    const response = yield call(axios.delete, API_TODOS_BY_ID(payload._id), payload)
    yield put({ type: actions.removeTodoSucceeded.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.removeTodoFailed.toString(), payload: error.message })
  }
}
function* toggleTodo({ payload }: any) {
  try {
    const response = yield call(axios.patch, API_TODOS_BY_ID('dfdfdfd'), payload)
    yield put({ type: actions.toggleTodoSucceeded.toString(), payload: response.data.data })
  } catch (error) {
    yield put({
      type: actions.toggleTodoFailed.toString(),
      payload: payloadError({ _id: payload._id, error: error.message }),
    })
  }
}
export function* todoSagas() {
  yield takeLatest(actions.getTodosRequested.toString(), getTodos),
    yield takeLatest(actions.addTodoRequested.toString(), addTodo),
    yield takeEvery(actions.removeTodoRequested.toString(), removeTodo),
    yield takeEvery(actions.toggleTodoRequested.toString(), toggleTodo)
}
