import React, { FC, useRef, useCallback } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { tasksInCalendar } from '../../../selectors/tasksInCalendar'
import { determinePlaceholderHeight } from '../../../utils'
import { Modal } from '../../../components/Modal'
import EditCalendarTask from './EditCalendarTask'
import { actions } from '../../../reducers/calendar'
import AddNewCalendarTask from './AddNewCalendarTask'

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
}

const Calendar: FC<Props> = ({ scale }) => {
  const wrapRef = useRef(null)
  const dispatch = useAppDispatch()
  const { hoursAxis, taskBeingEdited, taskBeingPrepared } = useSelector((state: AppState) => state.calendar)
  const placeholderHeight = determinePlaceholderHeight({ wrapRef, hoursAxis })
  const tasksMapped = useSelector(tasksInCalendar)


  const onAddNewCancel = useCallback(() => {
    // setTaskDetails({ isBeingEdited: false, time: [] })
    // setYAndHeightFromTime({ yFromTime: undefined, heightFromTime: placeholderHeight })
    dispatch(actions.removePreparedTask())
  }, [])
  console.log('calendar', placeholderHeight)

  return (
    <Wrap scale={scale} ref={wrapRef}>
      {tasksMapped.map(({ timestamp, tasks }) => (
        <CalendarColumn
          key={timestamp}
          isCurrentDay={false}
          timestamp={timestamp}
          tasksFiltered={tasks}
          placeholderHeight={placeholderHeight}
        />
      ))}
      {taskBeingEdited && (
        <Modal title="task details" width={17} onOverlayToggle={() => dispatch(actions.editTaskCancel())}>
          <EditCalendarTask />
        </Modal>
      )}

      {taskBeingPrepared !== undefined && (
        <Modal title="task details" width={17} onOverlayToggle={onAddNewCancel}>
          <AddNewCalendarTask onClose={onAddNewCancel} />
        </Modal>
      )}
    </Wrap>
  )
}

export default Calendar
