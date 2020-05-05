import React, { Fragment, useState, useRef, memo } from 'react'
import styled from 'styled-components'

import { WHITE, SIZE_SM, CHARCOAL, ISABELLINE, STYLE_ELLIPSIS } from '../../styles'
import { colorDarken } from '../../utils/colorDarken'
import CurrentTime from './CurrentTime'
import { useSelector, useDispatch } from 'react-redux'
import PlaceholderTask from './PlaceholderTask'
import { actions } from '../../reducers/calendar'
import Modal from '../../components/Modal/component'
import EditCalendarTask from './EditCalendarTask'

const CN_HOUR_SLOTS = 'hour-slots'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  border-left: 1px solid ${ISABELLINE};
  width: 0;

  &:first-child {
    border-left: 0;
  }

  ${p => p.isCurrentWeek && `
    flex-grow: 2;
  `};

  ${p => p.isCurrentDay && `
    flex-grow: 2;
    // background-color: ${CHARCOAL};

    // .${CN_HOUR_SLOTS} * {
    //   box-shadow: inset 0px 1px 0 0px ${CHARCOAL}, inset 0px -1px 0 0px ${CHARCOAL} !important;
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
  };
`
const Cell = styled.div`
  z-index: ${p => p.isGap ? 0 : 1};
  position: relative;
  display: flex;
  flex-grow: ${p => p.flex};
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 0;
  align-items: center;
  border-radius: 2px;
  box-shadow: inset 4px 1px 0 0 ${WHITE}, inset -4px -1px 0 0 ${WHITE};
  background-color: ${p => p.accentColor};
  display: block;
  padding: 0 ${SIZE_SM};
  line-height: 1.5;
  color: ${p => p.accentColor ? colorDarken(p.accentColor, -80) : 'red'};
  ${p => p.isSmall && `
    line-height: 0.8;
    font-size: 11px;
  `};
  ${STYLE_ELLIPSIS};
`

const CalendarColumn = ({ dateString, isCurrentDay, tasksFiltered }) => {
  const { hoursAxis, taskBeingEdited, taskBeingPrepared } = useSelector(state => state.calendar)
  const { groups } = useSelector(state => state.settings)
  const dispatch = useDispatch()

  const [y, setY] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const hourSlotsRef = useRef(null)

  function updatePlaceholderTask(event) {
    if (taskBeingPrepared !== undefined) return
    const HALF_HOUR_PX = 19.4
    const columnTopPx = event.currentTarget.getBoundingClientRect().top
    const placeholderY = event.clientY - columnTopPx
    const nearest25 = Math.floor(placeholderY / HALF_HOUR_PX) * HALF_HOUR_PX
    const isNewNearest = nearest25 !== y
    if (isNewNearest) setY(nearest25)
  }

  function onEditTask(id) {
    console.log('edit task', id)
    setIsEditModalOpen(true)
    dispatch(actions.editTask({ id, dateString }))
  }

  return (
    <Wrap isCurrentDay={isCurrentDay}>
      {isCurrentDay && <CurrentTime />}
      <HourSlots
        ref={hourSlotsRef}
        onMouseMove={updatePlaceholderTask}
        className={CN_HOUR_SLOTS}
      >
        {tasksFiltered.map(({ id, heightInFlex, name, group, gapBefore, gapAfter, }) => {
          const { color: { value } } = groups.find(x => x.name === group)
          return (
            <Fragment key={id}>
              {gapBefore > 0 && <Cell isGap flex={gapBefore} />}
              {heightInFlex > 0 && (
                <Cell
                  flex={heightInFlex}
                  accentColor={value}
                  isSmall={hoursAxis.length > 16 && heightInFlex <= 0.25}
                  onClick={() => onEditTask(id)}
                >
                  {name}
                </Cell>
              )}
              {gapAfter > 0 && <Cell isGap flex={gapAfter} />}
            </Fragment>
          )
        })}
        <PlaceholderTask hourSlotsRef={hourSlotsRef} y={y} />
      
        {isEditModalOpen && (
          <Modal
            title="task details"
            width={17}
            onOverlayToggle={() => setIsEditModalOpen(false)}
          >
            <EditCalendarTask taskBeingEdited={taskBeingEdited} />
          </Modal>
        )}
      </HourSlots>
    </Wrap>
  )
}

export default memo(CalendarColumn)
