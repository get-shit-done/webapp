import React, { FC } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import UseFilterRange from '../../../hooks/useFilterRange'
import UseHighlightFilteredRange from '../../../hooks/useHighlightFIlteredRange'
import { actions } from '../../../reducers/calendar'
import { AppState } from '../../../Application/Root'

const Wrap = styled.div<{ theme: { axisBg: string }, isBeingFiltered: boolean }>`
  z-index: 2;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  flex-direction: column;
  padding-top: 35px;
  padding-bottom: 12px;
  padding-left: 8px;
  width: 24px;
  background-color: ${p => p.theme.axisBg};
  transition: width 0.1s var(--transition-type), padding 0.1s var(--transition-type);

  ${p =>
    p.isBeingFiltered &&
    `
    padding-left: 0;
    width: 50px;
  `};

  &:hover {
    padding-left: 0;
    width: 50px;
  }
`
const HourLabel = styled.div<{
  theme: { axisBg: string, axisBorder: string };
  isFiltered: boolean;
  isActive: boolean;
  isBeingFiltered: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border-right: 4px solid ${p => p.theme.axisBg};
  text-align: center;
  font-size: 10px;
  color: var(--pastel-gray);

  &:hover {
    background-color: ${p => (p.isFiltered ? 'inherit' : 'var(--arsenic)')};
    cursor: ${p => (p.isFiltered ? 'inherit' : 'pointer')};
  }

  ${p =>
    p.isActive &&
    `
    background-color: var(--arsenic);
    box-shadow: inset 4px 0 0 0px ${p.theme.axisBg}, inset -4px 0 0 0px ${p.theme.axisBg}
  `};

  &::before {
    display: block;
    content: '';
    position: absolute;
    right: -4px;
    width: 6px;
    height: 1px;
    bottom: 0;
    background-color: ${p => p.theme.axisBorder};

    ${Wrap}:hover & {
      display: none;
    }
  }

  ${p =>
    p.isBeingFiltered &&
    `
    &::before {
      display: none;
    };
  `};

  &:last-child {
    &::before {
      display: none;
    }
  }
`

interface Props {
  onHover({ }: { axis: string; isReset?: boolean }): void
}

const HourLabels: FC<Props> = ({ onHover }) => {
  const { hoursAxis } = useSelector((state: AppState) => state.calendar)
  const [{ isFiltered, isBeingFiltered, from }, onFilter] = UseFilterRange({ from: 0, to: 23, cb: actions.filterHours })
  const [filteredRange, highlightFilteredRange] = UseHighlightFilteredRange({ isBeingFiltered, isFiltered, from })

  return (
    <Wrap
      isBeingFiltered={isBeingFiltered}
      onMouseEnter={() => onHover({ axis: 'x' })}
      onMouseLeave={() => onHover({ isReset: !isBeingFiltered, axis: 'x' })}
    >
      {hoursAxis.map(hour => (
        <HourLabel
          isBeingFiltered={isBeingFiltered}
          isFiltered={isFiltered}
          isActive={filteredRange.includes(hour)}
          key={hour}
          onMouseEnter={() => highlightFilteredRange(hour)}
          onClick={() => onFilter(hour)}
        >
          {hour}
        </HourLabel>
      ))}
    </Wrap>
  )
}

export default HourLabels
