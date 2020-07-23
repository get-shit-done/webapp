import React, { FC } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState } from '../../Application/Root'

const Wrap = styled.div<{ x: number; y: number }>`
  display: flex;
  flex-grow: 1;
  transform-origin: bottom right;
  transition: transform var(--transition);
  transform: ${p => `scale(${p.x}, ${p.y})`};
`

interface Props {
  scale: {
    x: number
    y: number
  }
}

const Calendar: FC<Props> = ({ scale: { x, y } }) => {
  const { hoursAxis, daysAxis, allTasksByDay } = useSelector((state: AppState) => state.calendar)

  return (
    <Wrap x={x} y={y}>
      {daysAxis.map(dateString => {
        const date = new Date(dateString)
        const day = format(date, 'd')
        const isCurrentDay = isToday(date)
        const tasks = allTasksByDay[dateString]?.tasks || []
        const tasksFiltered = tasks.map(({ _id, time, ...rest }, taskI) => {
          const from = time[0]
          const to = time[1]
          const isFirstTask = taskI === 0
          const isLastTask = taskI === tasks.length - 1
          const previousTo = !isFirstTask ? tasks[taskI - 1].time[1] : 0
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
            ...rest,
          }
        })

        return (
          <CalendarColumn key={day} isCurrentDay={isCurrentDay} dateString={dateString} tasksFiltered={tasksFiltered} />
        )
      })}
    </Wrap>
  )
}

export default Calendar
