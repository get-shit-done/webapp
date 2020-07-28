import React, { FC } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState } from '../../../Application/Root'

const Wrap = styled.div<{ scale: { x: number, y: number, duration: number } }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  transform-origin: bottom right;
  transition: transform ${p => p.scale.duration}s var(--transition-type);
  transform: ${p => `scale(${p.scale.x}, ${p.scale.y})`};
`

interface Props {
  scale: {
    x: number
    y: number
    duration: number,
  },
  calendarRef: any,
}

const Calendar: FC<Props> = ({ scale, calendarRef }) => {
  const { hoursAxis, daysAxis, allTasksByDay } = useSelector((state: AppState) => state.calendar)
  const placeholderHeightPx = calendarRef.current
    ? (calendarRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2)
    : 20
  // console.log(placeholderHeightPx)

  return (
    <Wrap scale={scale}>
      {/* <Time>
        time
      </Time> */}

      {/* calculate height of hour based on hours visible and px height */}
      {daysAxis.map(timestamp => {
        const date = new Date(timestamp)
        const day = format(date, 'd')
        const isCurrentDay = isToday(date)
        const tasks = allTasksByDay[timestamp]?.tasks || []
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
            time,
            ...rest,
          }
        })

        return (
          <CalendarColumn
            key={day}
            isCurrentDay={isCurrentDay}
            timestamp={timestamp}
            tasksFiltered={tasksFiltered}
            placeholderHeightPx={placeholderHeightPx}
          />
        )
      })}
    </Wrap>
  )
}

export default Calendar
