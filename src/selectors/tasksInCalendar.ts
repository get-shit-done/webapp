import { createSelector } from '@reduxjs/toolkit'
import { SavedTask } from '../reducers/calendar'
import { AppState } from '../Application/Root'

export const tasksByDateAndTime = () =>
  createSelector(
    (state: AppState) => state.calendar.allTasksByDay,
    (_: any, daysAxis: string[], hoursAxis: number[]) => ({ daysAxis, hoursAxis }),
    (allTasksByDay, { daysAxis, hoursAxis }) =>
      daysAxis.map((timestamp: string) => {
        console.log('SELECTOR: tasks by day and time')
        const tasks = allTasksByDay[timestamp]?.tasks || []
        return {
          timestamp,
          tasks: tasks.map((task: SavedTask, taskIndex: number) => {
            const { _id, time, ...rest } = task

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
          }),
        }
      }),
  )

export const daysAxis = createSelector(
  (state: AppState) => state.calendar.daysAxis,
  daysAxis =>
    daysAxis.map(day => {
      console.log('SELECTOR: days axis')
      // const tasks = calendar.allTasksByDay[timestamp]?.tasks || []
      return day
    }),
)
