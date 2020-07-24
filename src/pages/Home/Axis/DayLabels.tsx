import React, { FC } from 'react'
import styled from 'styled-components'
import isToday from 'date-fns/isToday'
import format from 'date-fns/format'

import UseFilterRange from '../../../hooks/useFilterRange'
import UseHighlightFilteredRange from '../../../hooks/useHighlightFIlteredRange'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/calendar'
import { MONTH_DAYS } from '../../../constants'
import { flex } from '../../../styles'
import { AppState } from '../../../Application/Root'

const Wrap = styled.div<{ isBeingFiltered: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  left: 2.4rem;
  z-index: 2;
  display: flex;
  height: 24px;
  font-size: 10px;
  color: var(--pastel-gray);
  background: var(--jet);
  transition: height var(--transition), padding var(--transition);

  ${p =>
    p.isBeingFiltered &&
    `
    height: 50px;
  `};

  &:hover {
    height: 50px;
  }
`
const DayLabel = styled.div<{
  isBeingFiltered: boolean
  isCurrentWeek?: boolean
  isCurrentDay: boolean
  isActive: boolean
  isFiltered: boolean
}>`
  ${flex({ grow: 1, shrink: 0, basis: 0, isCenter: true })};
  position: relative;
  border-bottom: 4px solid var(--jet);
  border-left: 1px solid transparent;
  padding-top: 8px;
  cursor: pointer;
  transition: padding var(--transition);

  &:last-child {
    &:after {
      content: '';
      padding-right: 8px;
    }
  }

  &:first-child {
    border-left: none;
    flex-direction: row-reverse;

    &::before {
      display: none;
    }

    &::after {
      content: '';
      position: static;
      width: 8px;
      background-color: transparent;
    }
  }

  ${Wrap}:hover & {
    padding-top: 0;

    &::before {
      display: none;
    }
  }

  ${p =>
    p.isBeingFiltered &&
    `
    padding-top: 16px;
    &::before {
      display: none;
    };
  `};

  ${p =>
    p.isCurrentWeek &&
    `
    flex-grow: 2;
  `};

  ${p =>
    p.isCurrentDay &&
    `
    flex-grow: 2;
    background-color: var(--white);
    color: var(--jet);
    ${!p.isActive && 'border-bottom: 4px solid var(--white)'};

    &:hover {
      border-bottom: 4px solid var(--jet);
    };

    & + .day-label-should-be-component-butTS {
      &::before {
        display: none;
      };
    };
  `};

  &:hover {
    color: var(--isabelline);
    background-color: var(--arsenic);

    ${p =>
      p.isFiltered &&
      `
      background-color: inherit;
      color: inherit;
      cursor: inherit;
    `};
  }

  ${p =>
    p.isActive &&
    `
    background-color: var(--arsenic);
    box-shadow: inset 0px 4px 0 0px var(--jet), inset 0px -4px 0 0px var(--jet);
    color: var(--isabelline);
  `};

  &::before {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 6px;
    bottom: -4px;
    background-color: #ffffff42;
  }
`
interface Props {
  onHover({}: { axis: string; isReset?: boolean }): void
}

const DayLabels: FC<Props> = ({ onHover }) => {
  const { daysAxis } = useSelector((state: AppState) => state.calendar)
  const [{ isFiltered, isBeingFiltered, from }, onFilter] = UseFilterRange({
    from: 1,
    to: MONTH_DAYS.length,
    cb: actions.filterDays,
  })
  const [filteredRange, highlightFilteredRange] = UseHighlightFilteredRange({ isBeingFiltered, isFiltered, from })

  return (
    <Wrap
      isBeingFiltered={isBeingFiltered}
      onMouseEnter={() => onHover({ axis: 'y' })}
      onMouseLeave={() => onHover({ isReset: !isBeingFiltered, axis: 'y' })}
    >
      {daysAxis.map(timestamp => {
        const date = new Date(timestamp)
        const day = Number(format(date, 'd'))
        const dayOfWeek = format(date, 'EEEEE')
        const isCurrentDay = isToday(date)

        return (
          <DayLabel
            key={day}
            isCurrentDay={isCurrentDay}
            isFiltered={isFiltered}
            isBeingFiltered={isBeingFiltered}
            isActive={filteredRange.includes(day)}
            onMouseEnter={() => highlightFilteredRange(day)}
            onClick={() => onFilter(day)}
          >
            {day} {dayOfWeek}
          </DayLabel>
        )
      })}
    </Wrap>
  )
}

export default DayLabels
