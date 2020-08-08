import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import {
  MONTH_DAYS,
  MONTH_DAYS_STRING,
  HOURS_IN_DAY,
  asyncStatusInitial,
  AsyncStatus,
  asyncStatusRequested,
  asyncStatusSuccess,
  asyncStatusFail,
} from '../constants'
import { taskSort } from '../utils'
import { shallowEqual } from 'react-redux'

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
  focusedTimestamp: string
  taskBeingPrepared: TaskBeingPrepared
  taskBeingEdited: TaskWithMeta | undefined
  allTasksByDay: IAllTasksByDay
  hoursAxis: number[]
  daysAxis: string[]
  asyncStatus: {
    getTasks: AsyncStatus
    saveTask: AsyncStatus
    removeTask: AsyncStatus
    addTask: AsyncStatus
  }
}
const initialState: IInitialState = {
  focusedTimestamp: undefined,
  taskBeingPrepared: undefined,
  taskBeingEdited: undefined,
  allTasksByDay: {},
  hoursAxis: HOURS_IN_DAY,
  daysAxis: MONTH_DAYS_STRING,
  asyncStatus: {
    getTasks: asyncStatusInitial,
    saveTask: asyncStatusInitial,
    removeTask: asyncStatusInitial,
    addTask: asyncStatusInitial,
  },
}

export const { reducer, actions } = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    filterHours(state, { payload: { from, to } }: PayloadAction<{ from: number; to: number }>): void {
      state.hoursAxis = HOURS_IN_DAY.filter(hour => hour >= from && hour <= to)
    },
    filterDays(state, { payload: { from, to } }: PayloadAction<{ from: string | number; to: string | number }>): void {
      state.daysAxis = MONTH_DAYS.filter(day => format(day, 'd') >= from && format(day, 'd') <= to).map(day =>
        day.toString(),
      )
    },
    saveFocusedTimestamp(state, { payload }: PayloadAction<{ timestamp: string }>): void {
      state.focusedTimestamp = payload.timestamp
    },
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
        task[x] = shallowEqual(state.taskBeingEdited[x], task[x]) ? task[x] : state.taskBeingEdited[x]
      }
      state.taskBeingEdited = undefined
    },
    saveTaskRequested(state, action: any) {
      state.asyncStatus.saveTask = asyncStatusRequested
    },
    saveTaskSuccess(state, { payload }: PayloadAction<SavedTask>): void {
      const { _id, timestamp } = payload
      const task: SavedTask = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
      for (const x in task) {
        task[x] = payload[x]
      }
      state.taskBeingEdited = undefined
      state.asyncStatus.saveTask = asyncStatusSuccess
    },
    saveTaskFailed(state, { payload }: PayloadAction<{ error: string }>) {
      state.asyncStatus.saveTask = asyncStatusFail(payload.error)
    },
    addTaskRequested(state, { payload }: PayloadAction<NewTask>): void {
      state.asyncStatus.addTask = asyncStatusRequested
    },
    addTaskSuccess(state, { payload }: PayloadAction<SavedTask>): void {
      const affectedDay = state.allTasksByDay[payload.timestamp] || { tasks: [] }
      affectedDay.tasks.push(payload)

      state.taskBeingEdited = undefined
      state.asyncStatus.addTask = asyncStatusSuccess
    },
    addTaskFailed(state, { payload }: PayloadAction<{ error: string }>) {
      state.asyncStatus.addTask = asyncStatusFail(payload.error)
    },
    getTasksRequested(state) {
      state.asyncStatus.getTasks = asyncStatusRequested
    },
    getTasksSuccess(state, { payload: { data } }: PayloadAction<{ data: IAllTasksByDay }>) {
      state.allTasksByDay = data
      state.asyncStatus.getTasks = asyncStatusSuccess
    },
    getTasksFail(state, { payload }: PayloadAction<{ error: string }>) {
      state.asyncStatus.getTasks = asyncStatusFail(payload.error)
    },
    removeTaskRequested(state, action): void {
      state.asyncStatus.removeTask = asyncStatusRequested
    },
    removeTaskSucceeded(state, { payload: { _id, timestamp } }) {
      // TODO: just moved this filter from asyncStatusRequested, make sure it actually works
      // TODO: reset remove async status on modal close
      state.allTasksByDay[timestamp].tasks = state.allTasksByDay[timestamp].tasks.filter(x => x._id !== _id)
      state.asyncStatus.removeTask = asyncStatusSuccess
    },
    removeTaskFailed(state, { payload }: PayloadAction<{ error: string }>) {
      state.asyncStatus.removeTask = asyncStatusFail(payload.error)
    },
    sortTasks(state, { payload: { timestamp } }): void {
      state.allTasksByDay[timestamp].tasks.sort(taskSort)
    },
  },
})
