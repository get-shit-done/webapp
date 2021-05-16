import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import { reducer as settings } from '../../reducers/settings'
import { reducer as calendar } from '../../reducers/calendar'
import { reducer as toast } from '../../components/Toast/reducer'

import { tasksApi } from "../../api";

const store = configureStore({
  reducer: {
    settings,
    calendar,
    toast,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tasksApi.middleware),
});

// if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
//   (module as any).hot.accept('./reducers', () => store.replaceReducer(reducers))
// }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
