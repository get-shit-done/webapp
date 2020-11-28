import { fork } from 'redux-saga/effects'

import { taskSagas } from '../../sagas/taskSagas'

export function* rootSagas() {
  yield* [fork(taskSagas)]
}
