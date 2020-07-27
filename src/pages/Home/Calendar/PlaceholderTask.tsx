import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { Modal } from '../../../components/Modal'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'

const Test = styled.div<{ isBeingPrepared: boolean, top: number, height: number }>`
  display: ${p => (p.isBeingPrepared ? 'block' : 'none')};
  position: absolute;
  top: ${p => p.top}px;
  right: 0;
  left: 0;
  height: ${p => p.height}px;

  .hour-slots:hover & {
    display: flex;
  }

  z-index: 22;
  &::before, &::after {
    content: '';
    position: fixed;
  };

  &::before {
    border-bottom: 1px dashed #3d4150;
    right: 0;
    left: 0;
    height: 1px;
  };

  &::after {
    border-right: 1px dashed #3d4150;
    top: 0;
    bottom: 0;
    width: 1px;
  };
`
const PlaceholderTaskWrap = styled.div<{ accentColor: string }>`
  ${ellipsis()};
  padding: 0 var(--size-sm);
  width: 100%;
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  background-color: ${p => p.accentColor || '#eee'};
  box-shadow:
    inset 4px 1px 0 0px var(--white),
    inset -4px -1px 0 0px var(--white),
    0px 1px 0 0px var(--white),
    0px -1px 0 0px var(--white);
  border-radius: 2px;
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
    <Test top={updatedY || y} isBeingPrepared={isTaskBeingPrepared} height={updatedHeight} onClick={onPrepareNewTask}>
      <PlaceholderTaskWrap
        accentColor={colors[colorId]}
      >
        {taskBeingPrepared?.name}
      </PlaceholderTaskWrap>

      {isTaskBeingPrepared && (
        <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
          <AddNewCalendarTask timestamp={timestamp} time={time} onModalClose={onModalClose} />
        </Modal>
      )}
    </Test>
  )
}

export default PlaceholderTask
