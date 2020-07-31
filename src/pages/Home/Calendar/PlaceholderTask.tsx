import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendarTasks'
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
  opacity: ${p => (p.isBeingPrepared ? '1' : '0')};
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
    opacity: 1;
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
  opacity: 0;

  &:hover {
    display: none;
  };

  .hour-slots:hover & {
    opacity: 1;
    transition: 0.2s opacity ease-out;
    transition-delay: 0.2s;
    transition-property: opacity;
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
  height30: number
}

const PlaceholderTask: FC<Props> = ({ timestamp, hourSlotsRef, y, timeFromY, height30 }) => {
  const dispatch = useAppDispatch()
  const { hoursAxis } = useSelector((state: AppState) => state.calendarAxis)
  const { taskBeingPrepared = { time: [] } } = useSelector((state: AppState) => state.calendarTasks)
  const { groups } = useSelector((state: AppState) => state.apiGroups)
  const { colors } = useSelector((state: AppState) => state.settings)
  const colorId = groups.find(x => x.name === taskBeingPrepared.group)?.colorId

  const [{ yFromTime, heightFromTime }, setYAndHeightFromTime] = useState({ yFromTime: undefined, heightFromTime: height30 })
  const [{ isBeingEdited, time }, setTaskDetails] = useState({ isBeingEdited: false, time: [] })

  function onPrepareNewTask() {
    const rounded = determineTimeFromY({ y, ref: hourSlotsRef, hoursAxis })
    setTaskDetails({ isBeingEdited: true, time: [rounded, rounded + 0.5] })
  }

  useEffect(() => {
    isBeingEdited && updateTaskFromTime()
  }, [taskBeingPrepared.time[0], taskBeingPrepared.time[1]])

  function updateTaskFromTime() {
    const timeFrom = taskBeingPrepared.time[0]
    const yAlg = timeFrom * (height30 * 2) - hoursAxis[0] * (height30 * 2)
    const heightAlg = (taskBeingPrepared.time[1] - taskBeingPrepared.time[0]) * height30 * 2
    setYAndHeightFromTime({ yFromTime: yAlg, heightFromTime: heightAlg })
  }

  const onModalClose = useCallback(() => {
    setTaskDetails({ isBeingEdited: false, time: [] })
    setYAndHeightFromTime({ yFromTime: undefined, heightFromTime: height30 })
    dispatch(actions.removePreparedTask())
  }, [])

  return (
    <>
      <PlaceholderTaskWrap
        isBeingPrepared={isBeingEdited}
        top={yFromTime ?? y}
        height={heightFromTime}
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
