import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import { MONTH_DAYS, MONTH_DAYS_STRING, HOURS_IN_DAY } from '../constants'

export interface TaskBeingPrepared {
  time?: number[]
  name: string
  group: string
}
export interface Task extends TaskBeingPrepared {
  _id: string
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
      dateString: string
    }
  }
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
    editTask(state, { payload: { _id, dateString } }: PayloadAction<{ _id: string; dateString: string }>): void {
      state.taskBeingEdited = state.allTasksByDay[dateString].tasks.find(x => x._id === _id)
    },
    saveTask(state, { payload: { _id, name, group, time, dateString } }: PayloadAction<any>): void {
      // TODO: need to extend Task
      state.allTasksByDay[dateString].tasks.map((task: Task) => {
        if (task._id !== _id) return task
        return {
          ...task,
          name,
          group,
          time: [Number(time[0]), Number(time[1])],
        }
      })
    },
    addTask(state, { payload: { name, dateString, group, from, to } }: PayloadAction<any>): void {
      // Todo: need to extend taskbeingprepared
      console.log(name, dateString, group, from, to)

      state.taskBeingEdited = null
      state.allTasksByDay[dateString].tasks.push({
        _id: nanoid(),
        time: [from, to],
        name,
        group: group.name,
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
