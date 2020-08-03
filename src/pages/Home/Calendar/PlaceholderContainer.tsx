import React, { FC, useState, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendarTasks'
import { Modal } from '../../../components/Modal'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { determineTimeFromY, taskShadow, placeholderShadow } from './shared'

const OuterWrap = styled.div<{ hoverIndex: number, theme: { columnHoverBg: string } }>`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:hover {
    & ~ .column:nth-child(${p => p.hoverIndex}) {
      background-color: ${p => p.theme.columnHoverBg};

      * {
        box-shadow: ${p => taskShadow(p.theme.columnHoverBg)};
      }
    };
  };
`
const PlaceholderTaskWrap = styled.div<{
  theme: { bg: string, columnHoverBg: string, placeholderBorder: string },
  isVisible: boolean,
  isBeingPrepared: boolean,
  top: number,
  left: number,
  width: number,
  height: number,
  accentColor: string,
}>`
  display: ${p => p.isVisible ? 'block' : 'none'};
  position: absolute;
  top: ${p => p.top}px;
  left: ${p => p.left}px;
  padding: 0 var(--size-sm);
  height: ${p => p.height}px;
  width: ${p => p.width}px;
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  background-color: ${p => p.accentColor || p.theme.bg};
  border-radius: 1px;
  
  ${p => !p.accentColor && placeholderShadow(p.theme.columnHoverBg, p.theme.placeholderBorder)};
  ${p => p.accentColor && `
    ${ellipsis()};
    ${taskShadow(p.theme.columnHoverBg)};
  `};
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
  height30: number
}

const PlaceholderContainer: FC<Props> = ({ height30 }) => {
  const wrapRef = useRef(null)
  const dispatch = useAppDispatch()


  const [{ x, y }, setCoordinates] = useState({ x: 0, y: 0 })
  const [hoverIndex, setHoverIndex] = useState(undefined)
  const [timeFromY, setTimeFromY] = useState(0)
  const [width, setWidth] = useState(0)
  const [placeholderVisibility, togglePlaceholder] = useState(false)

  const { hoursAxis, daysAxis } = useSelector((state: AppState) => state.calendarAxis)
  const { taskBeingPrepared = { time: [] } } = useSelector((state: AppState) => state.calendarTasks)
  const { groups } = useSelector((state: AppState) => state.apiGroups)
  const { colors } = useSelector((state: AppState) => state.settings)
  const colorId = groups.find(x => x.name === taskBeingPrepared.group)?.colorId

  const [{ yFromTime, heightFromTime }, setYAndHeightFromTime] = useState({ yFromTime: undefined, heightFromTime: height30 })
  const [{ isBeingEdited, time }, setTaskDetails] = useState({ isBeingEdited: false, time: [] })

  function onPrepareNewTask() {
    const rounded = determineTimeFromY({ y, ref: wrapRef, hoursAxis })
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


  function updatePlaceholderTask({ clientY, clientX }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { top, left, width } = wrapRef.current.getBoundingClientRect()
    const colWidth = width / daysAxis.length

    const yCurrent = clientY - top - (height30 / 4)
    const yNearest = Math.floor(yCurrent / (height30 / 2)) * (height30 / 2)
    const xCurrent = clientX - left
    const xNearest = Math.floor(xCurrent / colWidth) * colWidth
    // if (taskBeingPrepared) return

    setCoordinates({ x: xNearest, y: yNearest })
    console.log(xNearest / colWidth, Math.floor(xNearest / colWidth) + 2)
    setHoverIndex(Math.round(xNearest / colWidth) + 2)
    setWidth(colWidth)
    setTimeFromY(determineTimeFromY({ y, ref: wrapRef, hoursAxis: [1, 2, 3] }))
  }

  function togglePlaceholderVisibility() {
    togglePlaceholder(!placeholderVisibility)
  }

  // console.log('placeholder')

  return (
    <OuterWrap
      ref={wrapRef}
      onMouseOver={togglePlaceholderVisibility}
      onMouseMove={updatePlaceholderTask}
      onMouseOut={togglePlaceholderVisibility}
      hoverIndex={hoverIndex}
    >
      <PlaceholderTaskWrap
        isVisible={placeholderVisibility}
        isBeingPrepared={isBeingEdited}
        top={yFromTime ?? y}
        left={x}
        width={width}
        height={heightFromTime}
        onClick={onPrepareNewTask}
        accentColor={colors[colorId]}
      >
        {taskBeingPrepared?.name}
        {!isBeingEdited && <TimeWrap><TimeText>{timeFromY}</TimeText></TimeWrap>}
      </PlaceholderTaskWrap>

      {/* {isBeingEdited && (
        <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
          <AddNewCalendarTask timestamp={timestamp} time={time} onModalClose={onModalClose} />
        </Modal>
      )} */}
    </OuterWrap>
  )
}

export default PlaceholderContainer
