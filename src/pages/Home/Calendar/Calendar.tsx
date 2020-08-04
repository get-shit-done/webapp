import React, { FC, useRef, useCallback } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'

import { useSelector, shallowEqual } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { makeDaysAxis, makeHoursAxis, makeAllTasksByDay, makeAllTasksByDayMapped } from '../../../selectors/tasksInCalendar'
import { determinePlaceholderHeight } from '../../../utils'
import { Modal } from '../../../components/Modal'
import EditCalendarTask from './EditCalendarTask'
import { actions, SavedTask } from '../../../reducers/calendar'
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

const CalendarColumns: FC<{ wrapRef: React.MutableRefObject<any> }> = ({ wrapRef }) => {
  interface IAllTasksByDay {
    [key: string]: SavedTask[]
  }
  const daysAxis = useSelector(makeDaysAxis)
  const hoursAxis = useSelector(makeHoursAxis)
  const allTasksByDayMapped: IAllTasksByDay = useSelector(state => makeAllTasksByDayMapped(state, hoursAxis))
  const placeholderHeight = determinePlaceholderHeight({ wrapRef, hoursAxis })

  return (
    <>
      {daysAxis.map((timestamp) => (
        <CalendarColumn
          key={timestamp}
          isCurrentDay={isToday(new Date(timestamp))}
          timestamp={timestamp}
          tasksFiltered={allTasksByDayMapped[timestamp]}
          placeholderHeight={placeholderHeight}
        />
      ))}
    </>
  )
}

const Calendar: FC<Props> = ({ scale }) => {
  const wrapRef = useRef(null)
  const dispatch = useAppDispatch()
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited)
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared)

  const onRemovePreparedTask = useCallback(() => { dispatch(actions.removePreparedTask()) }, [])
  const onEditTaskCancel = useCallback(() => { dispatch(actions.editTaskCancel()) }, [])
  console.log('COMP: Calendar')

  return (
    <Wrap scale={scale} ref={wrapRef}>
      <CalendarColumns wrapRef={wrapRef} />

      {taskBeingEdited && (
        <Modal title="task details" width={17} onOverlayToggle={onEditTaskCancel}>
          <EditCalendarTask />
        </Modal>
      )}

      {taskBeingPrepared && (
        <Modal title="task details" width={17} onOverlayToggle={onRemovePreparedTask}>
          <AddNewCalendarTask onRemovePreparedTask={onRemovePreparedTask} />
        </Modal>
      )}
    </Wrap>
  )
}

export default Calendar
