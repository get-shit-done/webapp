import React, { FC } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState } from '../../../Application/Root'
import { tasksInCalendar } from '../../../selectors/tasksInCalendar'
import { SavedTask } from '../../../reducers/calendar'

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

  const tasksMapped: any = useSelector(tasksInCalendar)

  return (
    <Wrap scale={scale}>
      {tasksMapped.map(({ timestamp, tasks }: { timestamp: string, tasks: SavedTask[] }) => (
        <CalendarColumn
          key={timestamp}
          isCurrentDay={false}
          timestamp={timestamp}
          tasksFiltered={tasks}
          placeholderHeightPx={placeholderHeightPx}
        />
      ))}
    </Wrap>
  )
}

export default Calendar
