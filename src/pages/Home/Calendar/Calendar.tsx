import React, { FC, useRef, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import { useSelector, shallowEqual } from 'react-redux'
import CalendarColumn from './CalendarColumn'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { tasksByDateAndTime, daysAxis } from '../../../selectors/tasksInCalendar'
import { determinePlaceholderHeight } from '../../../utils'
import { Modal } from '../../../components/Modal'
import EditCalendarTask from './EditCalendarTask'
import { actions, SavedTask } from '../../../reducers/calendar'
import AddNewCalendarTask from './AddNewCalendarTask'
import { startOfWeekYear } from 'date-fns'

const Wrap = styled.div<{ scale: { x: number, y: number, duration: number } }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  transform-origin: bottom right;
  transition: transform ${p => p.scale.duration}s var(--transition-type);
  transform: ${p => `scale(${p.scale.x}, ${p.scale.y})`};
`

// const Test = styled.div`
//   display: flex;
//   width: 100%;
// `

interface Props {
  scale: {
    x: number
    y: number
    duration: number,
  },
}

// okay okay, maybe this is rerunning because the params need to be memoed
// COMMIT WHAT I HAVE NOW
// try memoizing the axis params
// if that fails, create 2 separate memo fns for axis and tasksByDateAndTime, and loop over axis
const CalendarColumns: FC<{ daysAxis: string[], hoursAxis: number[] }> = ({ daysAxis, hoursAxis }) => {
  const tasks = useMemo(tasksByDateAndTime, [])
  const tasksMemoed = useSelector(state => tasks(state, daysAxis, hoursAxis))

  return (
    <>
      {tasksMemoed.map(({ timestamp, tasks }: { timestamp: string, tasks: SavedTask[] }) => (
        <CalendarColumn
          key={timestamp}
          isCurrentDay={false}
          timestamp={timestamp}
          tasksFiltered={tasks}
          placeholderHeight={20}
        />
      ))}
    </>
  )
}

const Test = () => {
  const daysTest: any = useSelector(daysAxis)

  return (
    <div>
      {daysTest[0]}
    </div>
  )
}

const Calendar: FC<Props> = ({ scale }) => {
  const wrapRef = useRef(null)
  const dispatch = useAppDispatch()
  const { daysAxis, hoursAxis, taskBeingEdited, taskBeingPrepared } = useSelector((state: AppState) => state.calendar)
  const placeholderHeight = determinePlaceholderHeight({ wrapRef, hoursAxis })


  const onRemovePreparedTask = useCallback(() => {
    dispatch(actions.removePreparedTask())
  }, [])

  const onEditTaskCancel = useCallback(() => {
    dispatch(actions.editTaskCancel())
  }, [])
  console.log('COMP: Calendar')

  return (
    <Wrap scale={scale} ref={wrapRef}>
      <CalendarColumns daysAxis={daysAxis} hoursAxis={hoursAxis} />
      <Test />

      {taskBeingEdited && (
        <Modal title="task details" width={17} onOverlayToggle={onEditTaskCancel}>
          <EditCalendarTask />
        </Modal>
      )}

      {taskBeingPrepared !== undefined && (
        <Modal title="task details" width={17} onOverlayToggle={onRemovePreparedTask}>
          <AddNewCalendarTask onRemovePreparedTask={onRemovePreparedTask} />
        </Modal>
      )}
    </Wrap>
  )
}

export default Calendar
