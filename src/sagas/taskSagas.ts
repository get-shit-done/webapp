import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { API_TASKS, API_TASKS_BY_ID } from '../api'
import { actions, NewTask } from '../reducers/calendar'

const {
  getTasksSuccess,
  getTasksFail,
  addTaskSuccess,
  addTaskFailed,
  saveTaskSuccess,
  saveTaskFailed,
  getTasksRequested,
  addTaskRequested,
  saveTaskRequested,
} = actions

function* fetchTasks() {
  try {
    const response = yield call(axios.get, API_TASKS)
    yield put({ type: getTasksSuccess.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: getTasksFail.toString(), payload: error.message })
  }
}

function* addTask(data: any) {
  try {
    const response = yield call(axios.post, API_TASKS, data.payload)
    yield put({ type: addTaskSuccess.toString(), payload: response.data.data })
  } catch(error) {
    yield put({ type: addTaskFailed.toString(), payload: error.message })
  }
}

function* saveTask(data: any) {
  try {
    const response = yield call(axios.patch, API_TASKS_BY_ID(data.payload._id), data.payload)
    yield put({ type: saveTaskSuccess.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: saveTaskFailed.toString(), payload: error.message })
  }
}


function* taskSagas() {
  yield takeLatest(getTasksRequested.toString(), fetchTasks),
  yield takeLatest(addTaskRequested.toString(), addTask),
  yield takeLatest(saveTaskRequested.toString(), saveTask)
}

export { taskSagas }
