import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// import format from "date-fns/format";
import { API_TASKS, API_TASKS_BY_ID } from "../api";
import { actions } from "../reducers/calendar";
import { payloadError } from "../utils";

// function* fetchTasks({ payload }: any) {
//   try {
//     const formattedMonth = format(payload.date, "MMM");
//     const response = yield call(axios.get, `${API_TASKS}?month=${formattedMonth}`);
//     yield put({
//       type: actions.getTasksSuccess.toString(),
//       payload: { response: response.data.data, date: payload.date },
//     });
//   } catch (error) {
//     yield put({ type: actions.getTasksFail.toString(), payload: payloadError({ error: error.message }) });
//   }
// }

// function* addTask({ payload }: any) {
//   try {
//     // const response = yield call(axios.post, 'sdsd', payload)
//     const response = yield call(axios.post, API_TASKS, payload);
//     yield put({ type: actions.removePreparedTask.toString() });
//     yield put({ type: actions.addTaskSuccess.toString(), payload: response.data.data });
//     yield put({ type: actions.sortTasks.toString(), payload });
//   } catch (error) {
//     yield put({
//       type: actions.addTaskFailed.toString(),
//       payload: payloadError({ _id: payload._id, error: error.message }),
//     });
//   }
// }

function* saveTask({ payload }: any) {
  try {
    // const response = yield call(axios.patch, API_TASKS_BY_ID('sdsds'), payload)
    const response = yield call(axios.patch, API_TASKS_BY_ID(payload._id), payload);
    yield put({ type: actions.saveTaskSuccess.toString(), payload: response.data.data });
    yield put({ type: actions.sortTasks.toString(), payload: payload });
  } catch (error) {
    yield put({
      type: actions.saveTaskFailed.toString(),
      payload: payloadError({ _id: payload._id, error: error.message }),
    });
  }
}

function* removeTask({ payload }: any) {
  try {
    // const response = yield call(axios.delete, API_TASKS_BY_ID('sds'))
    const response = yield call(axios.delete, API_TASKS_BY_ID(payload._id));
    yield put({ type: actions.removeTaskSucceeded.toString(), payload });
    yield put({ type: actions.sortTasks.toString(), payload });
  } catch (error) {
    yield put({
      type: actions.removeTaskFailed.toString(),
      payload: payloadError({ _id: payload._id, error: error.message }),
    });
  }
}

function* taskSagas() {
  // yield takeLatest(actions.getTasksRequested.toString(), fetchTasks),
    // yield takeLatest(actions.addTaskRequested.toString(), addTask),
    yield takeLatest(actions.saveTaskRequested.toString(), saveTask),
    yield takeLatest(actions.removeTaskRequested.toString(), removeTask);
}

export { taskSagas };
