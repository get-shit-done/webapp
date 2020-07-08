import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import { MONTH_DAYS, MONTH_DAYS_STRING, HOURS_IN_DAY } from '../constants'

export interface TaskBeingPrepared {
  time?: number[],
  name: string,
  group: string
}
export interface Task extends TaskBeingPrepared {
  id: string,
}
export interface TaskWithMeta extends Task {
  heightInFlex?: number,
  gapBefore?: number,
  gapAfter?: number,
}
interface IInitialState {
  taskBeingPrepared: TaskBeingPrepared | null,
  taskBeingEdited: TaskWithMeta | null,
  allTasksByDay: {
    [key: string]: {
      tasks: Task[],
      dateString: string,
    },
  },
  hoursAxis: number[],
  daysAxis: string[],
}
const initialState: IInitialState = {
  taskBeingPrepared: undefined,
  taskBeingEdited: null,
  allTasksByDay: MONTH_DAYS_STRING.reduce((acc, cur, index) => {
    let tasks: Task[] = []

    if (index === 0) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 7],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [7, 7.75],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7.75, 8.5],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.5, 8.75],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.75, 11],
          name: 'windows admin',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [11, 15],
          name: 'docker upskill',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [15, 15.5],
          name: 'get lunch',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [15.5, 19.5],
          name: 'frontend upskill',
          group: 'improvement',
        },
      ]
    }
  
    if (index === 1) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 6.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [6.5, 7.25],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7.25, 8.5],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.5, 9],
          name: 'breakfast - pho',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9, 9.25],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9.25, 10],
          name: 'laze',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [10, 16],
          name: 'frontend upskill',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [16, 16.5],
          name: 'lunch',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [16.5, 18],
          name: 'frontend upskill',
          group: 'essentials',
        },
      ]
    }
  
    if (index === 2) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 6.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [6.5, 7.25],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7.25, 8.25],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.25, 8.75],
          name: 'breakfast - pho',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.75, 9],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9, 10],
          name: 'laze',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [10, 16],
          name: 'frontend upskill',
          group: 'improvement',
        },
      ]
    }
  
    if (index === 5) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 9.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9.5, 9.75],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [9.75, 10.75],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [10.75, 11],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [11, 12],
          name: 'laze',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [12, 17.5],
          name: 'frontend upskill',
          group: 'improvement',
        },
      ]
    }
  
    if (index === 6) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 6.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [6.5, 7],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7, 8.25],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.25, 8.75],
          name: 'breakfast - pho',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.75, 11],
          name: 'frontend youtube',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [11, 12.5],
          name: 'get-shit-done',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [12.5, 12.75],
          name: 'break',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [12.75, 18],
          name: 'get-shit-done',
          group: 'improvement',
        },
      ]
    }
  
    if (index === 7) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 7.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [7.5, 8.5],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [8.5, 9.5],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9.5, 10.75],
          name: 'work relax',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [10.75, 17],
          name: 'express-mongo',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [19.5, 21],
          name: 'express-mongo',
          group: 'improvement',
        },
      ]
    }

    return {
      ...acc,
      [MONTH_DAYS_STRING[index]]: {
        tasks,
        dateString: MONTH_DAYS_STRING[index],
      },
    }

  }, {}),

  // allTasksByDay: MONTH_DAYS_STRING.map((dateString, index) => {
  //   let tasks: Task[] = []


    // return {
    //   tasks,
    //   dateString,
    // }
  // }),
  hoursAxis: HOURS_IN_DAY,
  daysAxis: MONTH_DAYS_STRING,
}

export const { reducer, actions } = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    filterHours(state, { payload: { from, to } }: PayloadAction<{ from: number, to: number }>) {
      state.hoursAxis = HOURS_IN_DAY.filter(hour => hour >= from && hour <= to)
    },
    filterDays(state, { payload: { from, to } }: PayloadAction<{ from: string | number, to: string | number }>) {
      state.daysAxis = MONTH_DAYS
        .filter(day => format(day, 'd') >= from && format(day, 'd') <= to)
        .map(day => day.toString())
    },
    prepareTask(state, { payload: { name, group, time } }: PayloadAction<TaskBeingPrepared>) {
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
    editTask(state, { payload: { id, dateString } }: PayloadAction<{ id: string, dateString: string }>) {
      state.taskBeingEdited = state.allTasksByDay[dateString].tasks.find(x => x.id === id)
    },
    saveTask(state, { payload: { id, name, group, time, dateString }}: PayloadAction<any>) { // TODO: need to extend Task
      state.allTasksByDay[dateString].tasks.map((task: Task) => {
        if (task.id !== id) return task
        return {
          ...task,
          name,
          group,
          time: [Number(time[0]), Number(time[1])]
        }
      })
    },
    addTask(state, { payload: { name, dateString, group, from, to }}: PayloadAction<any>) { // Todo: need to extend taskbeingprepared
      console.log(name, dateString, group, from, to)

      state.taskBeingEdited = null
      state.allTasksByDay[dateString].tasks.push({
        id: nanoid(),
        time: [from, to],
        name,
        group: group.name,
      })
    }
  }
})
