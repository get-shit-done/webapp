import React, { FC, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { Modal } from '../../../components/Modal'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'

const Lines = styled.div<{ top: number, isBeingPrepared: boolean, height: number }>`
  display: ${p => (p.isBeingPrepared ? 'block' : 'none')};
  position: absolute;
  top: ${p => p.top}px;
  right: 0;
  left: 0;

  .hour-slots:hover & {
    display: flex;
  }

  /* TODO: considering removing this entirely. think about it */
  /* &::before, &::after {
    content: '';
    position: fixed;
    right: 0;
    left: 0;
    height: 1px;
  };

  &::before {
    border-top: 1px dashed #3d41503d;
    height: 1px;
  };

  &::after {
    border-bottom: 1px dashed #3d41503d;
    transform: translateY(${p => p.height}px);
  }; */
`
const PlaceholderTaskWrap = styled.div<{
  theme: { bg: string, columnHoverBg: string, placeholderBorder: string },
  isBeingPrepared: boolean,
  top: number,
  height: number,
  accentColor: string,
}>`
  ${ellipsis()};
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
  
  ${p => !p.accentColor && `
    box-shadow: 
      inset 4px 1px 0 0 ${p.theme.columnHoverBg},
      inset -4px -1px 0 0 ${p.theme.columnHoverBg},
      inset 6px 3px 0 0 ${p.theme.placeholderBorder},
      inset -6px -3px 0 0 ${p.theme.placeholderBorder};
  `};
  
  ${p => p.accentColor && `
    box-shadow: 
      inset 4px 1px 0 0 ${p.theme.columnHoverBg},
      inset -4px -1px 0 0 ${p.theme.columnHoverBg};
  `};

  .hour-slots:hover & {
    display: flex;
  }
`

interface Props {
  timestamp: string
  hourSlotsRef: any
  y: number
  height30: number
}

// TODO: get this calculation working - setting correct start time on different hours and zoom
const PlaceholderTask: FC<Props> = ({ timestamp, hourSlotsRef, y, height30 }) => {
  const dispatch = useAppDispatch()
  const { hoursAxis, taskBeingPrepared = { time: [] } } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const colorId = groups.find(x => x.name === taskBeingPrepared.group)?.colorId

  // functionality needs to be extracted into hooks for reuse in edit modal
  const [{ yFromTime, heightFromTime }, setYAndHeightFromTime] = useState({ yFromTime: undefined, heightFromTime: height30 })
  const [{ isBeingEdited, time }, setTaskDetails] = useState({ isBeingEdited: false, time: [] })

  function onPrepareNewTask() {
    const percentage = (y / hourSlotsRef.current.getBoundingClientRect().height) * 100
    const hourMin = hoursAxis[0]
    const hourMax = hoursAxis[hoursAxis.length - 1] + 1
    const alg = hourMin + (hourMax - hourMin) / 100 * percentage
    const rounded = Math.round(alg / 0.25) * 0.25
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
      <Lines top={yFromTime ?? y} isBeingPrepared={isBeingEdited} height={heightFromTime} />
      <>
        <PlaceholderTaskWrap
          isBeingPrepared={isBeingEdited}
          top={yFromTime ?? y}
          height={heightFromTime}
          onClick={onPrepareNewTask}
          accentColor={colors[colorId]}
        >
          {taskBeingPrepared?.name}
        </PlaceholderTaskWrap>

        {isBeingEdited && (
          <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
            <AddNewCalendarTask timestamp={timestamp} time={time} onModalClose={onModalClose} />
          </Modal>
        )}
      </>
    </>
  )
}

export default PlaceholderTask
