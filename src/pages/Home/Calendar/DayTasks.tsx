import React, { Fragment, useState, memo, FC } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { rgbAdjust, ellipsis } from '../../../styles'
import { actions, TaskWithMeta } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { taskShadow, taskShadowBeingEdited } from './shared'


interface ICell {
  theme: { bg: string };
  isInFocusedTimeframe: boolean;
  isBeingEdited: boolean;
  isGap?: boolean;
  flex: number;
  accentColor?: string;
  isSmall?: boolean;
}
const Cell = styled.div<ICell>`
  ${ellipsis()};
  z-index: ${p => (p.isGap ? 0 : 1)};
  position: relative;
  display: flex;
  flex-grow: ${p => p.flex};
  justify-content: center;
  flex-shrink: 0;
  flex-basis: 0;
  align-items: center;
  border-radius: 1px;
  ${p => taskShadow(p.theme.bg)}
  background-color: ${p => p.accentColor};
  display: block;
  padding: 0 var(--size-sm);
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  cursor: pointer;

  &:hover {
    background-color: ${p => p.accentColor ? rgbAdjust(p.accentColor, -10) : 'transparent'};
  };

  ${p => p.isBeingEdited && `
    background-color: ${p.accentColor ? rgbAdjust(p.accentColor, -10) : 'transparent'};
    ${taskShadowBeingEdited(p.theme.columnHoverBg)};
  `};
  ${p => (!p.isBeingEdited && p.isInFocusedTimeframe) && taskShadow(p.theme.columnHoverBg)};
  ${p => p.isSmall && `
    line-height: 0.8;
    font-size: 11px;
  `};
`

interface IProps {
  task: TaskWithMeta
}
const DayTasks: FC<IProps> = ({ task: { _id, group, timestamp, name, gapBefore, gapAfter, heightInFlex } }) => {
  console.log('day tasks', name)
  const { hoursAxis, taskBeingEdited, focusedTimestamp } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const dispatch = useAppDispatch()
  const { colorId } = groups.find(x => x.name === group)

  const isInFocusedTimeframe = timestamp === focusedTimestamp

  function onEditTask() {
    dispatch(actions.editTaskPrepare({ _id, timestamp }))
  }

  return (
    <Fragment>
      {gapBefore > 0 && (
        <Cell
          isGap
          flex={gapBefore}
          isInFocusedTimeframe={isInFocusedTimeframe}
          isBeingEdited={false}
        />
      )}

      {heightInFlex > 0 && (
        <Cell
          flex={heightInFlex}
          accentColor={colors[colorId]}
          isSmall={hoursAxis.length > 16 && heightInFlex <= 0.25}
          isInFocusedTimeframe={isInFocusedTimeframe}
          isBeingEdited={taskBeingEdited?._id === _id}
          onClick={onEditTask}
        >
          {name}
        </Cell>
      )}

      {gapAfter > 0 && (
        <Cell
          isGap
          flex={gapAfter}
          isInFocusedTimeframe={isInFocusedTimeframe}
          isBeingEdited={false}
        />
      )}
    </Fragment>
  )
}

export default memo(DayTasks)
