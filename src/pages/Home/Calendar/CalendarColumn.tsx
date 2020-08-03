import React, { Fragment, useState, useRef, memo, FC } from 'react'
import styled from 'styled-components'
// import { useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import { rgbAdjust, ellipsis } from '../../../styles'
import CurrentTime from './CurrentTime'
// import PlaceholderTask from './PlaceholderTask'
import { actions as actionsCalendarTasks, TaskWithMeta } from '../../../reducers/calendarTasks'
import { actions as actionsCalendarAxis } from '../../../reducers/calendarAxis'
import { Modal } from '../../../components/Modal'
import EditCalendarTask from './EditCalendarTask'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { determineTimeFromY, taskShadow, taskShadowBeingEdited } from './shared'

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
  tasksFiltered: any
  placeholderHeightPx: number
}

const CalendarColumn: FC<Props> = ({ timestamp, isCurrentDay, tasksFiltered, placeholderHeightPx }) => {
  // const selectHoursAxis = createSelector((state: any) => state.calendarAxis, (axis: any) => axis.hoursAxis)
  // const hoursAxis = useSelector(selectHoursAxis)
  const { taskBeingEdited, taskBeingPrepared } = useSelector((state: AppState) => state.calendarTasks)
  const { groups } = useSelector((state: AppState) => state.apiGroups)
  const { colors } = useSelector((state: AppState) => state.settings)
  const dispatch = useAppDispatch()

  // const [y, setY] = useState(0)
  // const [timeFromY, setTimeFromY] = useState(0)
  const [isEditModalOpen, setIsTaskBeingEdited] = useState(false)
  const hourSlotsRef = useRef(null)
  const isInFocusedTimeframe = false
  // const isInFocusedTimeframe = timestamp === focusedTimestamp

  function onEditTask(_id: string) {
    setIsTaskBeingEdited(true)
    dispatch(actionsCalendarTasks.editTaskPrepare({ _id, timestamp }))
  }

  function cancelTaskEditing() {
    setIsTaskBeingEdited(false)
    dispatch(actionsCalendarTasks.editTaskCancel())
  }

  function saveFocusedTimestamp() {
    // TODO: use selector so that this doesn't cause entire cal to rerender
    // dispatch(actionsCalendarAxis.saveFocusedTimestamp({ timestamp }))
  }
  console.log('column')

  return (
    <Wrap isCurrentDay={isCurrentDay} isInFocusedTimeframe={isInFocusedTimeframe} className="column">
      {isCurrentDay && <CurrentTime />}

      <HourSlots
        ref={hourSlotsRef}
        // onMouseMove={updatePlaceholderTask}
        onMouseEnter={saveFocusedTimestamp}
        className={CN_HOUR_SLOTS}
      >
        {tasksFiltered.map(({ _id, heightInFlex, name, group, gapBefore, gapAfter }: any) => {
          // console.log('tasks')
          const { colorId } = (groups.find(x => x.name === group)) || {}
          return (
            <Fragment key={_id}>
              {gapBefore > 0 && (
                <Cell
                  isGap
                  flex={gapBefore}
                  isInFocusedTimeframe={isInFocusedTimeframe}
                  isBeingEdited={false}
                />
              )}

              {heightInFlex > 0 && (
                <Cell
                  flex={heightInFlex}
                  accentColor={colors[colorId]}
                  isSmall={false}
                  isInFocusedTimeframe={isInFocusedTimeframe}
                  isBeingEdited={taskBeingEdited?._id === _id}
                  onClick={() => onEditTask(_id)}
                >
                  {name}
                </Cell>
              )}

              {gapAfter > 0 && (
                <Cell
                  isGap
                  flex={gapAfter}
                  isInFocusedTimeframe={isInFocusedTimeframe}
                  isBeingEdited={false}
                />
              )}
            </Fragment>
          )
        })}
        {/* <PlaceholderTask
          timestamp={timestamp}
          hourSlotsRef={hourSlotsRef}
          // y={y}
          // timeFromY={timeFromY}
          height30={placeholderHeightPx}
        /> */}

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
