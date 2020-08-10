import React, { FC, useRef, useCallback, useState } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'

import { useSelector, shallowEqual } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { makeDaysAxis, makeHoursAxis, makeAllTasksByDayMapped } from '../../../selectors'
import { determinePlaceholderHeight } from '../../../utils'
import { Modal } from '../../../components/Modal'
import EditCalendarTask from './EditCalendarTask'
import { actions, SavedTask } from '../../../reducers/calendar'
import AddNewCalendarTask from './AddNewCalendarTask'
import { SpinnerLoader, LoaderSvg } from '../../../components/Loader'

const Wrap = styled.div<{ scale: { x: number, y: number, duration: number } }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  transform-origin: bottom right;
  transition: transform ${p => p.scale.duration}s var(--transition-type);
  transform: ${p => `scale(${p.scale.x}, ${p.scale.y})`};
`
const CalendarLoader = styled(SpinnerLoader)`
  ${LoaderSvg} {
    padding: var(--size-sm);
    border: 1px solid #eee;
    border-radius: 50%;
    background-color: #fff;
  };
`

interface Props {
  scale: {
    x: number
    y: number
    duration: number,
  },
}

const CalendarColumns: FC<{ wrapRef: React.MutableRefObject<any> }> = ({ wrapRef }) => {
  const daysAxis = useSelector(makeDaysAxis)
  const hoursAxis = useSelector(makeHoursAxis)
  const allTasksByDayMapped = useSelector(state => makeAllTasksByDayMapped(state, hoursAxis))
  const placeholderHeight = determinePlaceholderHeight({ wrapRef, hoursAxis })
  console.log('COMP: Calendar columns')

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
  const { getTasks } = useSelector((state: AppState) => state.calendar.asyncStatus)
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited)
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared)

  const onRemovePreparedTask = useCallback(() => {
    dispatch(actions.removePreparedTask())
    dispatch(actions.resetAsyncStatus())
  }, [])
  const onEditTaskCancel = useCallback(() => {
    dispatch(actions.editTaskCancel())
    dispatch(actions.resetAsyncStatus())
  }, [])
  console.log('COMP: Calendar')

  return (
    <Wrap scale={scale} ref={wrapRef}>
      <CalendarLoader size={10} asyncStatus={getTasks} />
      <CalendarColumns wrapRef={wrapRef} />

      {taskBeingEdited && (
        <Modal title="task details" width={17} onOverlayToggle={onEditTaskCancel}>
          <EditCalendarTask />
        </Modal>
      )}

      {taskBeingPrepared && (
        <Modal title="task details" width={17} onOverlayToggle={onRemovePreparedTask}>
          <AddNewCalendarTask />
        </Modal>
      )}
    </Wrap>
  )
}

export default Calendar
