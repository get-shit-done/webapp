import { createSelector } from '@reduxjs/toolkit'
import { SavedTask } from '../reducers/calendarTasks'

export const selectTasksMapped: any = createSelector(
  (state: any) => state.calendarTasks,
  (state: any) =>
    state.daysAxis.map((datestring: string) => {
      // console.log(datestring, state.allTasksByDay)
      const tasks = state.allTasksByDay[datestring]?.tasks || []
      return tasks.map((task: SavedTask, taskIndex: number) => {
        const { _id, time, ...rest } = task

        const from = time[0]
        const to = time[1]
        const isFirstTask = taskIndex === 0
        const isLastTask = taskIndex === tasks.length - 1
        const previousTo = !isFirstTask ? tasks[taskIndex - 1].time[1] : 0
        // const firstHour = 0
        // const lastHourAdjusted = 23
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
      })
    }),
)
