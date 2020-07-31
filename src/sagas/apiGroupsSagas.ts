import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import { actions } from '../reducers/apiGroups'
import { API_GROUPS, API_GROUPS_BY_ID } from '../api'

function* getGroups() {
  try {
    const response = yield axios.get(API_GROUPS)
    yield put({ type: actions.getGroupsSucceeded.toString(), payload: response.data.data })
  } catch (error) {
    yield put({ type: actions.getGroupsFailed.toString, payload: error.message })
  }
}

function* updateGroup(data: any) {
  try {
    const response = yield axios.patch(API_GROUPS_BY_ID(data.payload.groupId), data.payload)
    yield put({ type: actions.updateGroupSucceeded.toString(), payload: response.data })
  } catch (error) {
    yield put({ type: actions.updateGroupFailed.toString(), payload: error.message })
  }
}

function* apiGroupsSagas() {
  yield takeLatest(actions.getGroupsRequested.toString(), getGroups),
    yield takeLatest(actions.updateGroupRequested.toString(), updateGroup)
}

export { apiGroupsSagas }
