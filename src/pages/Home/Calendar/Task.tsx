import React, { Fragment, memo, FC } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { rgbAdjust, ellipsis } from '../../../styles'
import { actions, TaskWithMeta } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { taskShadow, taskShadowBeingEdited, CN_COLUMN } from './shared'
import { makeHoursAxis } from '../../../selectors/tasksInCalendar'


interface ICell {
  theme: { bg: string };
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

  .${CN_COLUMN}:hover & {
    ${p => taskShadow(p.theme.columnHoverBg)};
  };

  ${p => p.isBeingEdited && `
    background-color: ${p.accentColor ? rgbAdjust(p.accentColor, -10) : 'transparent'};
    ${taskShadowBeingEdited(p.theme.columnHoverBg)};
  `};
  ${p => p.isSmall && `
    line-height: 0.8;
    font-size: 11px;
  `};
`

interface IProps {
  task: TaskWithMeta
  isBeingEdited: boolean
}
const Task: FC<IProps> = ({ task: { _id, group, timestamp, name, gapBefore, gapAfter, heightInFlex }, isBeingEdited }) => {
  console.log('COMP: Task - ', name)
  const hoursAxis = useSelector(makeHoursAxis)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const dispatch = useAppDispatch()
  const { colorId } = groups.find(x => x.name === group)

  function onEditTask() {
    dispatch(actions.editTaskPrepare({ _id, timestamp }))
  }

  return (
    <Fragment>
      {gapBefore > 0 && (
        <Cell
          isGap
          flex={gapBefore}
          isBeingEdited={false}
        />
      )}

      {heightInFlex > 0 && (
        <Cell
          flex={heightInFlex}
          accentColor={colors[colorId]}
          isSmall={hoursAxis.length > 16 && heightInFlex <= 0.25}
          isBeingEdited={isBeingEdited}
          onClick={onEditTask}
        >
          {name}
        </Cell>
      )}

      {gapAfter > 0 && (
        <Cell
          isGap
          flex={gapAfter}
          isBeingEdited={false}
        />
      )}
    </Fragment>
  )
}

export default memo(Task)
