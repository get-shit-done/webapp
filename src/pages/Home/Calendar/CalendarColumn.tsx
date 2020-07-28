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

const CN_HOUR_SLOTS = 'hour-slots'

const Wrap = styled.div<{ isCurrentWeek?: boolean; isCurrentDay: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  border-left: 1px solid var(--isabelline);
  width: 0;

  &:hover {
    border-left: 1px dashed #3d41503d;

    & + div {
      border-left: 1px dashed #3d41503d;
    };
  };

  &:first-child {
    border-left: 0;
  }

  ${p =>
    p.isCurrentWeek &&
    `
    flex-grow: 2;
  `};

  ${p =>
    p.isCurrentDay &&
    `
    flex-grow: 2;
    // background-color: var(--charcoal);

    // .${CN_HOUR_SLOTS} * {
    //   box-shadow: inset 0px 1px 0 0px var(--charcoal), inset 0px -1px 0 0px var(--charcoal) !important;
    // };
  `};
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
const Cell = styled.div<{ isGap?: boolean; flex: number; accentColor?: string; isSmall?: boolean }>`
  ${ellipsis()};
  z-index: ${p => (p.isGap ? 0 : 1)};
  position: relative;
  display: flex;
  flex-grow: ${p => p.flex};
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 0;
  align-items: center;
  border-radius: 2px;
  box-shadow: inset 4px 1px 0 0 var(--white), inset -4px -1px 0 0 var(--white);
  background-color: ${p => p.accentColor};
  display: block;
  padding: 0 var(--size-sm);
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};

  ${p =>
    p.isSmall &&
    `
    line-height: 0.8;
    font-size: 11px;
  `};
`

interface Props {
  timestamp: string
  isCurrentDay: boolean
  tasksFiltered: TaskWithMeta[]
  placeholderHeightPx: number
}

const CalendarColumn: FC<Props> = ({ timestamp, isCurrentDay, tasksFiltered, placeholderHeightPx }) => {
  const { hoursAxis, taskBeingEdited, taskBeingPrepared } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const dispatch = useAppDispatch()

  const [y, setY] = useState(0)
  const [isEditModalOpen, setIsTaskBeingEdited] = useState(false)
  const hourSlotsRef = useRef(null)

  function updatePlaceholderTask(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (taskBeingPrepared) return
    const columnTopPx = event.currentTarget.getBoundingClientRect().top
    const placeholderY = event.clientY - columnTopPx - (placeholderHeightPx / 4)
    const nearestSegment = Math.floor(placeholderY / (placeholderHeightPx / 2)) * (placeholderHeightPx / 2)
    const isNewNearest = nearestSegment !== y
    if (isNewNearest) setY(nearestSegment)
  }

  function onEditTask(_id: string) {
    setIsTaskBeingEdited(true)
    dispatch(actions.editTaskPrepare({ _id, timestamp }))
  }

  function cancelTaskEditing() {
    setIsTaskBeingEdited(false)
    dispatch(actions.editTaskCancel())
  }

  return (
    <Wrap isCurrentDay={isCurrentDay}>
      {isCurrentDay && <CurrentTime />}
      <HourSlots ref={hourSlotsRef} onMouseMove={updatePlaceholderTask} className={CN_HOUR_SLOTS}>
        {tasksFiltered.map(({ _id, heightInFlex, name, group, gapBefore, gapAfter }) => {
          const { colorId } = groups.find(x => x.name === group)
          return (
            <Fragment key={_id}>
              {gapBefore > 0 && <Cell isGap flex={gapBefore} />}
              {heightInFlex > 0 && (
                <Cell
                  flex={heightInFlex}
                  accentColor={colors[colorId]}
                  isSmall={hoursAxis.length > 16 && heightInFlex <= 0.25}
                  onClick={() => onEditTask(_id)}
                >
                  {name}
                </Cell>
              )}
              {gapAfter > 0 && <Cell isGap flex={gapAfter} />}
            </Fragment>
          )
        })}
        <PlaceholderTask
          timestamp={timestamp}
          hourSlotsRef={hourSlotsRef}
          y={y}
          height30={placeholderHeightPx}
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
