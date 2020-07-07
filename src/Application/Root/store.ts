import { configureStore } from '@reduxjs/toolkit'

import reducers from './reducers'

const store = configureStore({
  reducer: reducers,
})

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
  (module as any).hot.accept('./reducers', () => store.replaceReducer(reducers))
}

export type AppDispatch = typeof store.dispatch

export default store

