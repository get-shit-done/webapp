import React, { Fragment, useState, useRef, memo, FC } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { rgbAdjust, ellipsis } from '../../../styles'
import CurrentTime from './CurrentTime'
import PlaceholderTask from './PlaceholderTask'
import { actions, TaskWithMeta } from '../../../reducers/calendar'
import { Modal } from '../../../components/Modal'
import EditCalendarTask from './EditCalendarTask'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { determineTimeFromY, taskShadow, taskShadowBeingEdited } from './shared'
import DayTasks from './DayTasks'

const CN_HOUR_SLOTS = 'hour-slots'

interface IWrap {
  theme: { columnBorder: string },
  isCurrentDay: boolean,
  isInFocusedTimeframe: boolean,
}
const Wrap = styled.div<IWrap>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  border-left: 1px solid ${p => p.theme.columnBorder};
  width: 0;

  ${p => p.isInFocusedTimeframe && `background-color: ${p.theme.columnHoverBg}`};
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
  }

  ${Wrap}:first-child & {
    padding-left: 12px;
  }
`
interface ICell {
  theme: { bg: string };
  isInFocusedTimeframe: boolean;
  isBeingEdited: boolean;
  isGap?: boolean;
  flex: number;
  accentColor?: string;
  isSmall?: boolean;
}
const Cell = styled.div<ICell>`
  ${ellipsis()};
  z-index: ${p => (p.isGap ? 0 : 1)};
  position: relative;
  display: flex;
  flex-grow: ${p => p.flex};
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 0;
  align-items: center;
  border-radius: 1px;
  ${p => taskShadow(p.theme.bg)}
  background-color: ${p => p.accentColor};
  display: block;
  padding: 0 var(--size-sm);
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  cursor: pointer;

  &:hover {
    background-color: ${p => p.accentColor ? rgbAdjust(p.accentColor, -10) : 'transparent'};
  };

  ${Wrap}:hover & {
    ${p => taskShadow(p.theme.columnHoverBg)};
  };

  ${p => p.isBeingEdited && `
    background-color: ${p.accentColor ? rgbAdjust(p.accentColor, -10) : 'transparent'};
    ${taskShadowBeingEdited(p.theme.columnHoverBg)};
  `};
  ${p => (!p.isBeingEdited && p.isInFocusedTimeframe) && taskShadow(p.theme.columnHoverBg)};
  ${p => p.isSmall && `
    line-height: 0.8;
    font-size: 11px;
  `};
`

interface Props {
  timestamp: string
  isCurrentDay: boolean
  tasksFiltered: TaskWithMeta[]
  placeholderHeight: number
}

const CalendarColumn: FC<Props> = ({ timestamp, isCurrentDay, tasksFiltered, placeholderHeight }) => {
  const { hoursAxis, taskBeingEdited, taskBeingPrepared, focusedTimestamp } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const dispatch = useAppDispatch()
  console.log('calendarColumn')

  const [y, setY] = useState(0)
  const [timeFromY, setTimeFromY] = useState(0)
  const [isEditModalOpen, setIsTaskBeingEdited] = useState(false)
  const hourSlotsRef = useRef(null)
  const isInFocusedTimeframe = timestamp === focusedTimestamp

  function updatePlaceholderTask(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (taskBeingPrepared) return

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

  function onEditTask(_id: string) {
    setIsTaskBeingEdited(true)
    dispatch(actions.editTaskPrepare({ _id, timestamp }))
  }

  function cancelTaskEditing() {
    setIsTaskBeingEdited(false)
    dispatch(actions.editTaskCancel())
  }

  function saveFocusedTimestamp() {
    // dispatch(actions.saveFocusedTimestamp({ timestamp }))
  }

  // console.log('tasksFiltered', tasksFiltered)
  return (
    <Wrap isCurrentDay={isCurrentDay} isInFocusedTimeframe={isInFocusedTimeframe}>
      {isCurrentDay && <CurrentTime />}

      <HourSlots
        ref={hourSlotsRef}
        onMouseMove={updatePlaceholderTask}
        onMouseEnter={saveFocusedTimestamp}
        className={CN_HOUR_SLOTS}
      >
        {tasksFiltered.map(task => <DayTasks key={task._id} task={task} />)}
        <PlaceholderTask
          timestamp={timestamp}
          hourSlotsRef={hourSlotsRef}
          y={y}
          timeFromY={timeFromY}
          placeholderHeight={placeholderHeight}
        />

        {isEditModalOpen && (
          <Modal title="task details" width={17} onOverlayToggle={() => cancelTaskEditing()}>
            <EditCalendarTask timestamp={timestamp} taskBeingEdited={taskBeingEdited} />
          </Modal>
        )}
      </HourSlots>
    </Wrap>
  )
}

export default memo(CalendarColumn)
