import { fork } from 'redux-saga/effects'

import { taskSagas } from '../../sagas/taskSagas'
import { settingsSagas } from '../../sagas/settingsSagas'

export function* rootSagas() {
  yield* [fork(taskSagas), fork(settingsSagas)]
}
