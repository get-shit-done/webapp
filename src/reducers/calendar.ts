import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import { MONTH_DAYS, MONTH_DAYS_STRING, HOURS_IN_DAY } from '../constants'

export interface TaskBeingPrepared {
  // [key: string]: any,
  time?: number[]
  name?: string
  group?: string
}
export interface NewTask {
  [key: string]: any, // TODO: is this really necessary? wtf
  time: number[]
  name: string
  group: string
  timestamp: string,
}
export interface SavedTask extends NewTask {
  _id: string
}

export interface TaskWithMeta extends SavedTask {
  heightInFlex?: number
  gapBefore?: number
  gapAfter?: number
}
interface IInitialState {
  taskBeingPrepared: TaskBeingPrepared
  taskBeingEdited: TaskWithMeta | null
  allTasksByDay: {
    [key: string]: {
      tasks: SavedTask[]
    }
  },
  hoursAxis: number[]
  daysAxis: string[]
}
const initialState: IInitialState = {
  taskBeingPrepared: {},
  taskBeingEdited: null,
  allTasksByDay: {},
  hoursAxis: HOURS_IN_DAY,
  daysAxis: MONTH_DAYS_STRING,
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
    prepareTask(state, { payload: { name, group, time } }: PayloadAction<TaskBeingPrepared>): void {
      console.log('being prepared', { name, group, time })
      const taskBeingPrepared = {
        time,
        name,
        group,
      }
      state.taskBeingPrepared = taskBeingPrepared
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = {}
    },
    editTask(state, { payload: { _id, timestamp } }: PayloadAction<{ _id: string; timestamp: string }>): void {
      state.taskBeingEdited = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
    },
    saveTaskRequested(state, action) {},
    saveTaskSuccess(state, { payload }: PayloadAction<SavedTask>): void {
      const task: SavedTask = state.allTasksByDay[payload.timestamp].tasks.find(x => x._id === payload._id)
      for (const x in task) { task[x] = payload[x] }
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
      state.allTasksByDay[timestamp].tasks.sort((a, b) => {
        if (a.time[0] > b.time[0]) return 1
        if (a.time[0] < b.time[0]) return 0
        return -1
      })
    },
    addTaskSuccess(state, { payload: { _id, timestamp }}: PayloadAction<SavedTask>): void {
      const taskAdded = state.allTasksByDay[timestamp].tasks.find(x => x._id === 'just-added')
      taskAdded._id = _id
    },
    addTaskFailed() {},
    getTasksRequested() {},
    getTasksSuccess(state, { payload: { data } }) {
      state.allTasksByDay = data
    },
    getTasksFail(state, action) {},
  },
})
