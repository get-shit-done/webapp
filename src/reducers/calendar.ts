import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import { MONTH_DAYS, MONTH_DAYS_STRING, HOURS_IN_DAY } from '../constants'

export interface TaskBeingPrepared {
  [key: string]: any, // TODO: is this really necessary? wtf
  time?: number[]
  name: string
  group: string
}
export interface Task extends TaskBeingPrepared {
  _id: string
  timestamp: string,
}
export interface TaskWithMeta extends Task {
  heightInFlex?: number
  gapBefore?: number
  gapAfter?: number
}
interface IInitialState {
  taskBeingPrepared: TaskBeingPrepared | null
  taskBeingEdited: TaskWithMeta | null
  allTasksByDay: {
    [key: string]: {
      tasks: Task[]
    }
  },
  hoursAxis: number[]
  daysAxis: string[]
}
const initialState: IInitialState = {
  taskBeingPrepared: undefined,
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
      state.taskBeingPrepared = undefined
    },
    editTask(state, { payload: { _id, timestamp } }: PayloadAction<{ _id: string; timestamp: string }>): void {
      state.taskBeingEdited = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id)
    },
    saveTaskRequested(state, action) {},
    saveTaskSuccess(state, { payload }: PayloadAction<Task>): void {
      const task: Task = state.allTasksByDay[payload.timestamp].tasks.find(x => x._id === payload._id)
      for (const x in task) { task[x] = payload[x] }
    },
    saveTaskFailed() {},
    addTask(state, { payload: { name, timestamp, group, from, to } }: PayloadAction<any>): void {
      // Todo: need to extend taskbeingprepared
      console.log(name, timestamp, group, from, to)

      state.taskBeingEdited = null
      state.allTasksByDay[timestamp].tasks.push({
        _id: nanoid(),
        time: [from, to],
        name,
        group: group.name,
        timestamp,
      })
    },
    getTasks() {},
    getTasksSuccess(state, { payload: { data } }) {
      // console.log('daaata', data)
      state.allTasksByDay = data
    },
    getTasksFail(state, action) {
      console.log(action)
    },
  },
})
