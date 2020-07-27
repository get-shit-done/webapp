import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { Modal } from '../../../components/Modal'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'

const PlaceholderTaskWrap = styled.div<{ isBeingPrepared: boolean; accentColor: string; top: number, height: number }>`
  /* ${ellipsis()}; */
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

  z-index: 22;
  &::before, &::after {
    content: '';
    position: absolute;
  };

  &::before {
    border-bottom: 1px dashed #3d4150;
    /* top: 100%; */
    right: 100%;
    width: 100vw;
    height: 1px;
  };

  &::after {
    border-right: 1px dashed #3d4150;
    right: 100%;
    width: 1px;
    height: 100vh;
    bottom: 100%;
  };
`

interface Props {
  timestamp: string
  hourSlotsRef: any
  y: number
  height30: number
}

// TODO: get this calculation working - setting correct start time on different hours and zoom
const PlaceholderTask: FC<Props> = ({ timestamp, hourSlotsRef, y, height30 }) => {
  const { hoursAxis, taskBeingPrepared = { time: [] } } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)

  // functionality needs to be extracted into hooks for reuse in edit modal
  const [defaultTime, setDefaultTime] = useState([])
  const [updatedY, setPlaceholderY] = useState(y)
  const [updatedHeight, setUpdatedHeight] = useState(height30)

  const [{ isTaskBeingPrepared, time }, setState] = useState({ isTaskBeingPrepared: false, time: [] })
  const dispatch = useAppDispatch()
  const colorId = groups.find(x => x.name === taskBeingPrepared.group)?.colorId

  function onPrepareNewTask() {
    const halfHoursToShow = [...hoursAxis.map(x => x), ...hoursAxis.map(x => x + 0.5)].sort((a, b) => a - b)
    const visibleHalfHours = halfHoursToShow.length
    const percentage = (y / hourSlotsRef.current.getBoundingClientRect().height) * 100
    const index = Math.round(visibleHalfHours / (100 / (percentage)))
    const selectedHalfHour = halfHoursToShow[index]

    setState({ isTaskBeingPrepared: true, time: [selectedHalfHour, selectedHalfHour + 0.5] })
  }

  useEffect(() => {
    !defaultTime.length && setDefaultTime(taskBeingPrepared.time)
    defaultTime && isTaskBeingPrepared && taskBeingPrepared.time.toString() !== defaultTime.toString() && updateTime()
  }, [taskBeingPrepared.time[0], taskBeingPrepared.time[1]])

  function updateTime() {
    const yUpdated = y - (defaultTime[0] - taskBeingPrepared.time[0]) * height30 * 2
    const heightUpdated = (taskBeingPrepared.time[1] - taskBeingPrepared.time[0]) * height30 * 2
    setPlaceholderY(yUpdated)
    setUpdatedHeight(heightUpdated)
  }

  const onModalClose = useCallback(() => {
    setState({ isTaskBeingPrepared: false, time: [] })
    dispatch(actions.removePreparedTask())
  }, [])

  return (
    <>
      <PlaceholderTaskWrap
        isBeingPrepared={isTaskBeingPrepared}
        top={updatedY || y}
        accentColor={colors[colorId]}
        height={updatedHeight}
        onClick={onPrepareNewTask}
      >
        {taskBeingPrepared?.name}
      </PlaceholderTaskWrap>

      {isTaskBeingPrepared && (
        <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
          <AddNewCalendarTask timestamp={timestamp} time={time} onModalClose={onModalClose} />
        </Modal>
      )}
    </>
  )
}

export default PlaceholderTask
