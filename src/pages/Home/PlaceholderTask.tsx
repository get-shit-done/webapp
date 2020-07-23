import React, { FC, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions } from '../../reducers/calendar'
import Modal from '../../components/Modal/component'
import AddNewCalendarTask from './AddNewCalendarTask'
import { rgbAdjust, ellipsis } from '../../styles'
import { AppState, useAppDispatch } from '../../Application/Root'

const PlaceholderTaskWrap = styled.div<{ isBeingPrepared: boolean; accentColor: string; top: number }>`
  ${ellipsis()};
  display: ${p => (p.isBeingPrepared ? 'block' : 'none')};
  position: absolute;
  top: ${p => p.top}px;
  right: 0;
  left: 0;
  padding: 0 var(--size-sm);
  line-height: 1.5;
  color: ${p => (p.accentColor ? rgbAdjust(p.accentColor, -80) : 'red')};
  background-color: ${p => p.accentColor || '#eee'};
  box-shadow: inset 4px 1px 0 0px var(--white), inset -4px -1px 0 0px var(--white), 0px 1px 0 0px var(--white),
    0px -1px 0 0px var(--white);
  border-radius: 2px;
  height: 19.4px;

  .hour-slots:hover & {
    display: flex;
  }
`

interface Props {
  timestamp: string
  hourSlotsRef: any
  y: number
}

const PlaceholderTask: FC<Props> = ({ timestamp, hourSlotsRef, y }) => {
  const { taskBeingPrepared = { group: '', name: '' } } = useSelector((state: AppState) => state.calendar)
  const { groups } = useSelector((state: AppState) => state.settings)
  const [{ isModalOpen, timeFrom }, setState] = useState({ isModalOpen: false, timeFrom: undefined })
  const dispatch = useAppDispatch()

  function onPrepareNewTask() {
    const timeStart = 24 / (hourSlotsRef.current.getBoundingClientRect().height / y)
    const timeStartRounded = Number(timeStart.toFixed(1))
    setState({ isModalOpen: true, timeFrom: timeStartRounded })
  }

  const onModalClose = useCallback(() => {
    setState({ isModalOpen: false, timeFrom: undefined })
    dispatch(actions.removePreparedTask())
  }, [])

  return (
    <>
      <PlaceholderTaskWrap
        isBeingPrepared={timeFrom}
        top={y}
        accentColor={groups.find(x => x.name === taskBeingPrepared.group)?.color.value}
        onClick={onPrepareNewTask}
      >
        {taskBeingPrepared.name}
      </PlaceholderTaskWrap>

      {isModalOpen && (
        <Modal title="task details" width={17} onOverlayToggle={onModalClose}>
          <AddNewCalendarTask timestamp={timestamp} timeFrom={timeFrom} onModalClose={onModalClose} />
        </Modal>
      )}
    </>
  )
}

export default PlaceholderTask
