import React, { FC } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import CalendarColumn from './CalendarColumn'
import { AppState } from '../../../Application/Root'
import { IAllTasksByDay, SavedTask } from '../../../reducers/calendarTasks'
import { selectTasksMapped } from '../../../selectors/tasks'
import PlaceholderContainer from './PlaceholderContainer'

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
  // TODO: add ref here to wrap or to placeholder and pass in
  // add today styling to column back
  // width of placehoolder
  // save current hover to own reducer and use in axis
  const selectHoursAxis = createSelector((state: any) => state.calendarAxis, (axis: any) => axis.hoursAxis)
  const selectDayAxis = createSelector((state: any) => state.calendarAxis, (axis: any) => axis.daysAxis)

  const tasksMapped: any = useSelector(selectTasksMapped)
  console.log('tasksMappedtasksMapped', tasksMapped)

  const hoursAxis = useSelector(selectHoursAxis)
  const placeholderHeightPx = calendarRef.current
    ? (calendarRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2)
    : 20
  console.log('calendar')

  return (
    <Wrap scale={scale}>
      <PlaceholderContainer height30={placeholderHeightPx} />
      {tasksMapped.map(({ timestamp, tasks }: { timestamp: string, tasks: SavedTask[] }) => {

        return (
          <CalendarColumn
            key={timestamp}
            isCurrentDay={false}
            timestamp={timestamp}
            tasksFiltered={tasks}
            placeholderHeightPx={placeholderHeightPx}
          />
        )
      })}
    </Wrap>
  )
}

export default Calendar
