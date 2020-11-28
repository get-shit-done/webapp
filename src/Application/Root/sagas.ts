import { fork } from 'redux-saga/effects'

import { taskSagas } from '../../sagas/taskSagas'
import { groupSagas } from '../../sagas/groupSagas'

export function* rootSagas() {
  yield* [fork(taskSagas), fork(groupSagas)]
}
