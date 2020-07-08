import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import { rootSagas } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSagas)

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./reducers', () => store.replaceReducer(reducers))
}

export type AppDispatch = typeof store.dispatch

export default store

