import { createSelector } from '@reduxjs/toolkit'
import { SavedTask } from '../reducers/calendar'
import { AppState } from '../Application/Root'

export const tasksInCalendar = createSelector(
  (state: AppState) => state.calendar,
  state =>
    state.daysAxis.map((timestamp: string) => {
      const tasks = state.allTasksByDay[timestamp]?.tasks || []
      return {
        timestamp,
        tasks: tasks.map((task: SavedTask, taskIndex: number) => {
          const { _id, time, ...rest } = task

          const from = time[0]
          const to = time[1]
          const isFirstTask = taskIndex === 0
          const isLastTask = taskIndex === tasks.length - 1
          const previousTo = !isFirstTask ? tasks[taskIndex - 1].time[1] : 0
          const firstHour = state.hoursAxis[0]
          const lastHourAdjusted = state.hoursAxis[state.hoursAxis.length - 1] + 1

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
