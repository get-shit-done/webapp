import { fork } from 'redux-saga/effects';

import { apiTestSagas } from '../../sagas/apiTest'

export function* rootSagas() {
  yield* [
    fork(apiTestSagas),
  ]
}
