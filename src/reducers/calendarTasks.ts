import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { taskSort } from '../utils'
import { MONTH_DAYS_STRING, HOURS_IN_DAY } from '../constants'

export interface TaskBeingPrepared {
  timestamp?: string
  time?: number[]
  name?: string
  group?: string
}
export interface NewTask {
  [key: string]: any
  time: number[]
  name: string
  group: string
  timestamp: string
}
export interface SavedTask extends NewTask {
  _id: string
}

export interface TaskWithMeta extends SavedTask {
  heightInFlex?: number
  gapBefore?: number
  gapAfter?: number
}
export interface IAllTasksByDay {
  [key: string]: {
    tasks: SavedTask[]
  }
}
interface IInitialState {
  daysAxis: string[]
  hoursAxis: number[]
  taskBeingPrepared: TaskBeingPrepared
  taskBeingEdited: TaskWithMeta | null
  allTasksByDay: IAllTasksByDay
}
const initialState: IInitialState = {
  daysAxis: MONTH_DAYS_STRING,
  hoursAxis: HOURS_IN_DAY,
  taskBeingPrepared: undefined,
  taskBeingEdited: null,
  allTasksByDay: {},
}

export const { reducer, actions } = createSlice({
  name: 'calendarTasks',
  initialState,
  reducers: {
    prepareTask(state, { payload }: PayloadAction<TaskBeingPrepared>): void {
      state.taskBeingPrepared = payload
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = undefined
    },
    editTaskPrepare(state, { payload: { _id, timestamp } }: PayloadAction<{ _id: string; timestamp: string }>): void {
      state.taskBeingEdited = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
    },
    editTaskReplaceValues(state, { payload }: PayloadAction<SavedTask>): void {
      const { _id, timestamp } = payload
      const task = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
      for (const x in task) {
        task[x] = payload[x] ?? task[x]
      }
    },
    editTaskCancel(state): void {
      const { _id, timestamp } = state.taskBeingEdited
      const task = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
      for (const x in task) {
        task[x] = state.taskBeingEdited[x]
      }
      state.taskBeingEdited = null
    },
    saveTaskRequested(state, action) {},
    saveTaskSuccess(state, { payload }: PayloadAction<SavedTask>): void {
      const { _id, timestamp } = payload
      const task: SavedTask = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
      for (const x in task) {
        task[x] = payload[x]
      }
    },
    saveTaskFailed() {},
    addTaskRequested(state, { payload: { name, timestamp, group, time } }: PayloadAction<NewTask>): void {
      state.allTasksByDay[timestamp] = state.allTasksByDay[timestamp] || { tasks: [] }

      state.taskBeingEdited = null
      state.allTasksByDay[timestamp].tasks.push({
        _id: 'just-added',
        time,
        name,
        group,
        timestamp,
      })
    },
    addTaskSuccess(state, { payload: { _id, timestamp } }: PayloadAction<SavedTask>): void {
      const taskAdded = state.allTasksByDay[timestamp].tasks.find(x => x._id === 'just-added')
      taskAdded._id = _id
    },
    addTaskFailed() {},
    getTasksRequested() {},
    getTasksSuccess(state, { payload: { data } }) {
      state.allTasksByDay = data
    },
    getTasksFail(state, action) {},
    removeTaskRequested(state, { payload: { _id, timestamp } }): void {
      state.allTasksByDay[timestamp].tasks = state.allTasksByDay[timestamp].tasks.filter(x => x._id !== _id)
    },
    removeTaskSucceeded() {},
    removeTaskFailed() {},
    sortTasks(state, { payload: { timestamp } }): void {
      state.allTasksByDay[timestamp].tasks.sort(taskSort)
    },
  },
})