import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { API_GET_TASKS, API_SAVE_TASK } from '../api'
import { actions, Task } from '../reducers/calendar'

function* fetchTasks() {
  try {
    const response = yield call(axios.get, API_GET_TASKS)
    yield put({ type: actions.getTasksSuccess.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: actions.getTasksFail.toString(), payload: error.message })
  }
}

function* saveTask(task: any) {
  // console.log(task.payload._id)
  try {
    const response = yield call(axios.patch, API_SAVE_TASK(task.payload._id), task.payload)
    console.log('responseresponse', response)
    yield put({ type: actions.saveTaskSuccess.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.saveTaskFailed.toString(), payload: error.message })
  }
}


function* taskSagas() {
  yield takeLatest(actions.getTasks.toString(), fetchTasks),
  yield takeLatest(actions.saveTaskRequested.toString(), saveTask)
}

export { taskSagas }
