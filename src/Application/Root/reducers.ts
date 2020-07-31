import { combineReducers } from 'redux'
import undoable from '../../reducers/undoable'
import { reducer as apiGroups } from '../../reducers/apiGroups'
import { reducer as settings } from '../../reducers/settings'
import { reducer as todos } from '../../reducers/todos'
import { reducer as calendarAxis } from '../../reducers/calendarAxis'
import { reducer as calendarTasks } from '../../reducers/calendarTasks'
import { reducer as toast } from '../../components/Toast/reducer'

const rootReducer = combineReducers({
  apiGroups,
  settings,
  todos: undoable(todos),
  calendarAxis,
  calendarTasks,
  toast,
})

export default rootReducer
export type AppState = ReturnType<typeof rootReducer>
