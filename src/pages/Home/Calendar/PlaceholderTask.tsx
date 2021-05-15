import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { rgbAdjust, ellipsis } from '../../../styles'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { determineTimeFromY, taskShadow, placeholderShadow } from './shared'
import { IGroup } from '../../../reducers/settings'

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
  isPlaceholderBeingEdited: boolean
  timestamp: string
  hourSlotsRef: any
  y: number
  timeFromY: number
  placeholderHeight: number
  groups: IGroup[]
}

const PlaceholderTask: FC<Props> = ({
  isPlaceholderBeingEdited,
  timestamp,
  hourSlotsRef,
  y,
  timeFromY,
  placeholderHeight,
  groups,
}) => {
  // console.log('COMP: placeholder Task', taskBeingPrepared)
  const dispatch = useAppDispatch()
  const { hoursAxis, taskBeingPrepared } = useSelector((state: AppState) => state.calendar)
  // const { groups, colors } = useSelector((state: AppState) => state.settings)
  const { colors } = useSelector((state: AppState) => state.settings)
  const [{ yFromTime, heightFromTime }, setYAndHeight] = useState({ yFromTime: y, heightFromTime: placeholderHeight })

  const colorId = taskBeingPrepared ? groups.find(x => x.name === taskBeingPrepared.group)?.colorId : undefined

  function onPrepareNewTask() {
    const rounded = determineTimeFromY({ y, ref: hourSlotsRef, hoursAxis })
    dispatch(actions.prepareTask({
      name: '',
      group: 'improvement',
      timestamp,
      time: [rounded, rounded + 0.5],
    }))
  }

  useEffect(() => {
    isPlaceholderBeingEdited && updatePlaceholder()
  }, [taskBeingPrepared?.time])

  function updatePlaceholder() {
    const yAlg = taskBeingPrepared.time[0] * (placeholderHeight * 2) - hoursAxis[0] * (placeholderHeight * 2)
    const heightAlg = (taskBeingPrepared.time[1] - taskBeingPrepared.time[0]) * placeholderHeight * 2
    setYAndHeight({ yFromTime: yAlg, heightFromTime: heightAlg })
  }

  return (
    <PlaceholderTaskWrap
      isBeingPrepared={isPlaceholderBeingEdited}
      top={isPlaceholderBeingEdited ? yFromTime : y}
      height={isPlaceholderBeingEdited ? heightFromTime : placeholderHeight}
      onClick={onPrepareNewTask}
      accentColor={colors[colorId]}
    >
      {taskBeingPrepared?.name}
      {!isPlaceholderBeingEdited && <TimeWrap><TimeText>{timeFromY}</TimeText></TimeWrap>}
    </PlaceholderTaskWrap>
  )
}

export default PlaceholderTask
