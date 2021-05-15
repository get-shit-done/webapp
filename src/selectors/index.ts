import { createSelector } from '@reduxjs/toolkit'
import { SavedTask, IAllTasksByDay as IAllTasksByDayFromReducer } from '../reducers/calendar'
import { AppState } from '../Application/Root'

export interface IAllTasksByDay {
  [key: string]: SavedTask[]
}

export const makeAllTasksByDayMapped = createSelector(
  ({ state }: { state: any }) => state.calendar.taskBeingEdited,
  ({ hoursAxis }: { hoursAxis: number[] }) => hoursAxis,
  ({ allTasksByDay }: { allTasksByDay: IAllTasksByDayFromReducer }) => allTasksByDay,
  (taskBeingEdited, hoursAxis, allTasksByDay) => {
    // console.log('SELECTOR: all tasks by day mapped', taskBeingEdited, hoursAxis, allTasksByDay)
    const mapped: IAllTasksByDay = {}
    if (Object.values(allTasksByDay).length === 0) {
      return {}
    }

    Object.entries(allTasksByDay).forEach(([datestring, value]) => {
      mapped[datestring] = value.tasks.map((task: SavedTask, taskIndex: number) => {
        const tasks = value.tasks || []
        const { _id, time, ...rest } = task
        // console.log('task', task)

        const from = time[0]
        const to = time[1]
        const isFirstTask = taskIndex === 0
        const isLastTask = taskIndex === tasks.length - 1
        const previousTo = !isFirstTask ? tasks[taskIndex - 1].time[1] : 0
        const firstHour = hoursAxis[0]
        const lastHourAdjusted = hoursAxis[hoursAxis.length - 1] + 1

        let heightInFlex = Math.min(to, lastHourAdjusted) - Math.max(from, firstHour)
        let gapBefore = Math.min(from - previousTo, from - firstHour, lastHourAdjusted - previousTo)
        let gapAfter = isLastTask ? lastHourAdjusted - to : 0

        return {
          _id,
          heightInFlex,
          gapBefore,
          gapAfter,
          time,
          ...rest,
        }
      })
    })
    // console.log('selector', mapped)
    return mapped
  },
)

export const makeDaysAxis = createSelector(
  (state: AppState) => state.calendar.daysAxis,
  daysAxis => daysAxis,
)

export const makeHoursAxis = createSelector(
  (state: AppState) => state.calendar.hoursAxis,
  hoursAxis => hoursAxis,
)
