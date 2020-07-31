import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { API_TASKS, API_TASKS_BY_ID } from '../api'
import { actions } from '../reducers/calendarTasks'

function* fetchTasks() {
  try {
    const response = yield call(axios.get, API_TASKS)
    yield put({ type: actions.getTasksSuccess.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: actions.getTasksFail.toString(), payload: error.message })
  }
}

function* addTask(data: any) {
  try {
    yield put({ type: actions.sortTasks.toString(), payload: data.payload })
    const response = yield call(axios.post, API_TASKS, data.payload)
    yield put({ type: actions.addTaskSuccess.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.addTaskFailed.toString(), payload: error.message })
  }
}

function* saveTask(data: any) {
  try {
    yield put({ type: actions.sortTasks.toString(), payload: data.payload })
    const response = yield call(axios.patch, API_TASKS_BY_ID(data.payload._id), data.payload)
    yield put({ type: actions.saveTaskSuccess.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.saveTaskFailed.toString(), payload: error.message })
  }
}

function* removeTask(data: any) {
  try {
    yield put({ type: actions.sortTasks.toString(), payload: data.payload })
    const response = yield call(axios.delete, API_TASKS_BY_ID(data.payload._id))
    yield put({ type: actions.removeTaskSucceeded.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: actions.removeTaskFailed.toString(), payload: error.message })
  }
}

function* taskSagas() {
  yield takeLatest(actions.getTasksRequested.toString(), fetchTasks),
    yield takeLatest(actions.addTaskRequested.toString(), addTask),
    yield takeLatest(actions.saveTaskRequested.toString(), saveTask),
    yield takeLatest(actions.removeTaskRequested.toString(), removeTask)
}

export { taskSagas }
