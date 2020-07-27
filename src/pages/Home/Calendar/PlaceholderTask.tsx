import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { Modal } from '../../../components/Modal'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'

const PlaceholderTaskWrap = styled.div<{ isBeingPrepared: boolean; accentColor: string; top: number, height: number }>`
  ${ellipsis()};
  display: ${p => (p.isBeingPrepared ? 'block' : 'none')};
  position: absolute;
  top: ${p => p.top}px;
  right: 0;
  left: 0;
  padding: 0 var(--size-sm);
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  background-color: ${p => p.accentColor || '#eee'};
  box-shadow:
    inset 4px 1px 0 0px var(--white),
    inset -4px -1px 0 0px var(--white),
    0px 1px 0 0px var(--white),
    0px -1px 0 0px var(--white);
  border-radius: 2px;
  height: ${p => p.height}px;

  .hour-slots:hover & {
    display: flex;
  }

  /* z-index: 2;
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: red;
  };

  &::before {
    top: 100%;
    right: 100%;
    width: 100vw;
    height: 1px;
  };

  &::after {
    right: 100%;
    width: 1px;
    height: 100vh;
    bottom: 100%;
  }; */
`

interface Props {
  timestamp: string
  hourSlotsRef: any
  y: number
  height: number
}

// TODO: get this calculation working - setting correct start time on different hours and zoom
const PlaceholderTask: FC<Props> = ({ timestamp, hourSlotsRef, y, height }) => {
  const { hoursAxis, taskBeingPrepared } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const [{ isTaskBeingPrepared, timeFrom }, setState] = useState({ isTaskBeingPrepared: false, timeFrom: undefined })
  const dispatch = useAppDispatch()
  const colorId = groups.find(x => x.name === taskBeingPrepared.group)?.colorId

  function onPrepareNewTask() {
    const halfHoursToShow = [...hoursAxis.map(x => x), ...hoursAxis.map(x => x + 0.5)].sort((a, b) => a - b)
    const visibleHalfHours = halfHoursToShow.length
    const percentage = (y / hourSlotsRef.current.getBoundingClientRect().height) * 100
    const index = Math.round(visibleHalfHours / (100 / (percentage)))
    const selectedHalfHour = halfHoursToShow[index]

    setState({ isTaskBeingPrepared: true, timeFrom: selectedHalfHour })
  }

  const onModalClose = useCallback(() => {
    setState({ isTaskBeingPrepared: false, timeFrom: undefined })
    dispatch(actions.removePreparedTask())
  }, [])

  return (
    <>
      <PlaceholderTaskWrap
        isBeingPrepared={isTaskBeingPrepared}
        top={y}
        accentColor={colors[colorId]}
        height={height}
        onClick={onPrepareNewTask}
      >
        {taskBeingPrepared?.name}
      </PlaceholderTaskWrap>

      {isTaskBeingPrepared && (
        <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
          <AddNewCalendarTask timestamp={timestamp} timeFrom={timeFrom} onModalClose={onModalClose} />
        </Modal>
      )}
    </>
  )
}

export default PlaceholderTask
