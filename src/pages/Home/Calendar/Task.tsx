import React, { memo, FC } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { rgbAdjust, ellipsis } from '../../../styles'
import { actions, TaskWithMeta } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { taskShadow, taskShadowBeingEdited, CN_COLUMN, CN_TASK_GAP } from './shared'
import { makeHoursAxis } from '../../../selectors'


interface ICell {
  theme: { bg: string };
  isBeingEdited: boolean;
  flex: number;
  accentColor: string;
  isSmall: boolean;
}
const Cell = styled.div<ICell>`
  ${ellipsis()};
  z-index: 1;
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
  color: ${p => rgbAdjust(p.accentColor, -80)};
  cursor: pointer;

  &:hover {
    background-color: ${p => rgbAdjust(p.accentColor, -10)};
  };

  .${CN_COLUMN}:hover & {
    ${p => taskShadow(p.theme.columnHoverBg)};
  };

  ${p => p.isBeingEdited && `
    background-color: ${rgbAdjust(p.accentColor, -10)};
    ${taskShadowBeingEdited(p.theme.columnHoverBg)};
  `};
  ${p => p.isSmall && `
    line-height: 0.8;
    font-size: 11px;
  `};
`

const CellGap = styled.div<{ flex: number }>`
  z-index: 0;
  display: flex;
  flex-grow: ${p => p.flex};
  flex-shrink: 0;
  flex-basis: 0;
  border-radius: 1px;
`

interface IProps {
  task: TaskWithMeta
  isBeingEdited: boolean
}
const Task: FC<IProps> = ({
  task: { _id, group, timestamp, name, gapBefore, gapAfter, heightInFlex },
  isBeingEdited,
}) => {
  const hoursAxis = useSelector(makeHoursAxis)
  const groups = useSelector((state: AppState) => state.settings.groups)
  const colors = useSelector((state: AppState) => state.settings.colors)
  const dispatch = useAppDispatch()
  const { colorId } = (groups.find(x => x.name === group) || {})

  const onEditTask = () => { dispatch(actions.editTaskPrepare({ _id, timestamp })) }

  return (
    <>
      {gapBefore > 0 && <CellGap className={CN_TASK_GAP} flex={gapBefore} />}
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
      {gapAfter > 0 && <CellGap className={CN_TASK_GAP} flex={gapAfter} />}
    </>
  )
}

export default memo(Task)
