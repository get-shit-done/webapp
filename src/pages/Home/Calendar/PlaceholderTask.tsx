import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { Modal } from '../../../components/Modal'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { determineTimeFromY, taskShadow, placeholderShadow } from './shared'

const PlaceholderTaskWrap = styled.div<{
  theme: { bg: string, columnHoverBg: string, placeholderBorder: string },
  isBeingPrepared: boolean,
  top: number,
  height: number,
  accentColor: string,
}>`
  display: ${p => (p.isBeingPrepared ? 'block' : 'none')};
  position: absolute;
  top: ${p => p.top}px;
  right: 0;
  left: 0;
  padding: 0 var(--size-sm);
  height: ${p => p.height}px;
  width: 100%;
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  background-color: ${p => p.accentColor || p.theme.bg};
  border-radius: 1px;
  
  ${p => !p.accentColor && placeholderShadow(p.theme.columnHoverBg, p.theme.placeholderBorder)};
  ${p => p.accentColor && `
    ${ellipsis()};
    ${taskShadow(p.theme.columnHoverBg)};
  `};

  .hour-slots:hover & {
    display: flex;
  };
`

const TimeWrap = styled.div`
  display: flex;
  z-index: 2;
  position: absolute;
  top: 2px;
  left: 100%;
  color: #fff;
  font-weight: bold;
  text-align: right;

  &:hover {
    display: none;
  };
`
const TimeText = styled.div`
  width: 34px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  height: 16px;
  display: block;
  line-height: 1;
  padding: 1px 4px;
`

interface Props {
  timestamp: string
  hourSlotsRef: any
  y: number
  timeFromY: number,
  placeholderHeight: number
}

const PlaceholderTask: FC<Props> = ({ timestamp, hourSlotsRef, y, timeFromY, placeholderHeight }) => {
  // console.log('placeholder', placeholderHeight)
  const dispatch = useAppDispatch()
  const { hoursAxis, taskBeingPrepared = { time: [] } } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const colorId = groups.find(x => x.name === taskBeingPrepared.group)?.colorId

  const [{ yFromTime, heightFromTime }, setYAndHeightFromTime] = useState({ yFromTime: undefined, heightFromTime: placeholderHeight })
  const [{ isBeingEdited, time }, setTaskDetails] = useState({ isBeingEdited: false, time: [] })

  function onPrepareNewTask() {
    const rounded = determineTimeFromY({ y, ref: hourSlotsRef, hoursAxis })
    setTaskDetails({ isBeingEdited: true, time: [rounded, rounded + 0.5] })
  }

  useEffect(() => {
    isBeingEdited && updateTaskFromTime()
  }, [taskBeingPrepared.time[0], taskBeingPrepared.time[1]])

  function updateTaskFromTime() {
    console.log('update placeholder y from time')
    const timeFrom = taskBeingPrepared.time[0]
    const yAlg = timeFrom * (placeholderHeight * 2) - hoursAxis[0] * (placeholderHeight * 2)
    const heightAlg = (taskBeingPrepared.time[1] - taskBeingPrepared.time[0]) * placeholderHeight * 2
    setYAndHeightFromTime({ yFromTime: yAlg, heightFromTime: heightAlg })
  }

  const onModalClose = useCallback(() => {
    setTaskDetails({ isBeingEdited: false, time: [] })
    setYAndHeightFromTime({ yFromTime: undefined, heightFromTime: placeholderHeight })
    dispatch(actions.removePreparedTask())
  }, [])

  return (
    <>
      <PlaceholderTaskWrap
        isBeingPrepared={isBeingEdited}
        top={yFromTime ?? y}
        height={isBeingEdited ? heightFromTime : placeholderHeight}
        onClick={onPrepareNewTask}
        accentColor={colors[colorId]}
      >
        {taskBeingPrepared?.name}
        {!isBeingEdited && <TimeWrap><TimeText>{timeFromY}</TimeText></TimeWrap>}
      </PlaceholderTaskWrap>

      {isBeingEdited && (
        <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
          <AddNewCalendarTask timestamp={timestamp} time={time} onModalClose={onModalClose} />
        </Modal>
      )}
    </>
  )
}

export default PlaceholderTask
