import React, { useState, useRef, memo, FC } from 'react'
import styled from 'styled-components'
import { useSelector, shallowEqual } from 'react-redux'

import CurrentTime from './CurrentTime'
import PlaceholderTask from './PlaceholderTask'
import { TaskWithMeta } from '../../../reducers/calendar'
import { AppState } from '../../../Application/Root'
import { determineTimeFromY, CN_COLUMN, CN_HOUR_SLOTS } from './shared'
import Task from './Task'
import { makeHoursAxis } from '../../../selectors/tasksInCalendar'

interface IWrap {
  theme: { columnBorder: string },
  isCurrentDay: boolean,
}
const Wrap = styled.div<IWrap>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  border-left: 1px solid ${p => p.theme.columnBorder};
  width: 0;

  ${p => p.isCurrentDay && `flex-grow: 2;`};

  &:hover {
    background-color: ${p => p.theme.columnHoverBg}
  };
  &:first-child {
    border-left: 0;
  };
`

const HourSlots = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 12px 0;

  ${Wrap}:last-child & {
    padding-right: 12px;
  };

  ${Wrap}:first-child & {
    padding-left: 12px;
  };
`

interface Props {
  timestamp: string
  isCurrentDay: boolean
  tasksFiltered: TaskWithMeta[]
  placeholderHeight: number
}

const CalendarColumn: FC<Props> = ({ timestamp, isCurrentDay, tasksFiltered = [], placeholderHeight }) => {
  const hoursAxis = useSelector(makeHoursAxis)
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited)
  console.log('COMP: CalendarColumn')

  const [y, setY] = useState(0)
  const [timeFromY, setTimeFromY] = useState(0)
  const hourSlotsRef = useRef(null)

  function updatePlaceholderTask(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const columnTopPx = event.currentTarget.getBoundingClientRect().top
    const placeholderY = event.clientY - columnTopPx - (placeholderHeight / 4)
    const newY = Math.floor(placeholderY / (placeholderHeight / 2)) * (placeholderHeight / 2)
    const isNewNearest = newY !== y
    if (isNewNearest) {
      const rounded = determineTimeFromY({ y: newY, ref: hourSlotsRef, hoursAxis })
      setY(newY)
      setTimeFromY(rounded)
    }
  }

  function saveFocusedTimestamp() {
    // dispatch(actions.saveFocusedTimestamp({ timestamp }))
  }

  return (
    <Wrap isCurrentDay={isCurrentDay} className={CN_COLUMN}>
      {isCurrentDay && <CurrentTime />}

      <HourSlots
        ref={hourSlotsRef}
        onMouseMove={updatePlaceholderTask}
        onMouseEnter={saveFocusedTimestamp}
        className={CN_HOUR_SLOTS}
      >
        {tasksFiltered.map(task => <Task key={task._id} task={task} isBeingEdited={taskBeingEdited?._id === task._id} />)}
        <PlaceholderTask
          timestamp={timestamp}
          hourSlotsRef={hourSlotsRef}
          y={y}
          timeFromY={timeFromY}
          placeholderHeight={placeholderHeight}
        />
      </HourSlots>
    </Wrap>
  )
}

export default memo(CalendarColumn)
