import React, { FC } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState } from '../../../Application/Root'

const Wrap = styled.div<{ x: number; y: number }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  transform-origin: bottom right;
  transition: transform var(--transition);
  transform: ${p => `scale(${p.x}, ${p.y})`};
`

// const Time = styled.div`
//   position: absolute;
//   z-index: 2;
//   left: 300px;
//   top: 400px;
//   color: red;
//   background-color: red;

//   &::before, &::after {
//     content: '';
//     position: absolute;
//     background-color: red;
//   };

//   &::before {
//     top: 100%;
//     right: 100%;
//     width: 100vw;
//     height: 1px;
//   };

//   &::after {
//     right: 100%;
//     width: 1px;
//     height: 100vh;
//     bottom: 100%;
//   };
// `

interface Props {
  scale: {
    x: number
    y: number
  },
  calendarRef: any,
}

const Calendar: FC<Props> = ({ scale: { x, y }, calendarRef }) => {
  const { hoursAxis, daysAxis, allTasksByDay } = useSelector((state: AppState) => state.calendar)
  const placeholderHeightPx = calendarRef.current
    ? (calendarRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2)
    : 20
  console.log(placeholderHeightPx)

  return (
    <Wrap x={x} y={y}>
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
