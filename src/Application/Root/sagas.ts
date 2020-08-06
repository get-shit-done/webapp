import { fork } from 'redux-saga/effects'

import { taskSagas } from '../../sagas/taskSagas'
import { groupSagas } from '../../sagas/groupSagas'
import { todoSagas } from '../../sagas/todoSagas'

export function* rootSagas() {
  yield* [fork(taskSagas), fork(groupSagas), fork(todoSagas)]
}
