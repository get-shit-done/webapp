import { fork } from 'redux-saga/effects'

import { taskSagas } from '../../sagas/taskSagas'
import { apiGroupsSagas } from '../../sagas/apiGroupsSagas'

export function* rootSagas() {
  yield* [fork(taskSagas), fork(apiGroupsSagas)]
}
