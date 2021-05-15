import { combineReducers } from 'redux'
// import undoable from '../../reducers/undoable'
import { reducer as settings } from '../../reducers/settings'
import { reducer as calendar } from '../../reducers/calendar'
import { reducer as toast } from '../../components/Toast/reducer'

const rootReducer = combineReducers({
  settings,
  calendar,
  toast,
})

export default rootReducer
export type AppState = ReturnType<typeof rootReducer>
