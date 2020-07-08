import React, { useEffect, memo, useState, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { actions } from './reducer'
import { AppState, useAppDispatch } from '../../Application/Root'

const Wrap = styled.div`
  z-index: 1;
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const InnerWrap = styled.div`
  padding: var(--size-xlg);
  padding-right: 10rem;
  width: 100%;
  width: 32rem;
  line-height: 1.4;
  background: var(--sunset-orange);
  color: var(--white);
  border-radius: 2px;
  transition: opacity 0.2s ease-out;
  box-shadow: 0px -3px 6px -1px #ffc0c06b;

  &:hover {
    opacity: 0.8;
  };
`
const Prefix = styled.span`
  margin-right: var(--size-sm);
  border-right: 1px solid #ffffff5e;
  padding-right: var(--size-sm);
  font-size: 14px;
  font-weight: bold;
`
const Message = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const Undo = styled.div`
  position: absolute;
  right: var(--size-lg);
  padding: var(--size-sm) var(--size-lg);
  font-weight: bold;
  color: var(--sunset-orange);
  text-transform: uppercase;
  background-color: var(--white);
  border-radius: 21px;
`
const TimeRemaining = styled.span`
  margin-left: var(--size-xsm);
  font-weight: bold;
`

function Toast() {
  const timeoutIdRef = useRef(null)
  const timeRemainingRef = useRef(null)
  const [timeRemaining, setTimeRemaining] = useState(5)
  const { message, messagePrefix } = useSelector((state: AppState) => state.toast.toast)
  const dispatch = useAppDispatch()
  timeRemainingRef.current = timeRemaining

  const onRemove = () => { dispatch(actions.removeToast()) }
  const onUndo = () => {
    dispatch({ type: 'UNDO' })
    onRemove()
  }
  const onUpdateTimer = () => {
    setTimeRemaining(t => t - 1)
    if (timeRemainingRef.current === 0) {
      onRemove()
    }
  }

  useEffect(() => {
    if (message) {
      timeoutIdRef.current = setInterval(() => onUpdateTimer(), 1000)
    }

    return () => {
      clearTimeout(timeoutIdRef.current)
      setTimeRemaining(5)
    }
  }, [message])


  return (
    !message ? null : (
      <Wrap>
        <InnerWrap onClick={onRemove}>
          <Message><Prefix>{messagePrefix}</Prefix>{message}</Message>
        </InnerWrap>
        <Undo onClick={onUndo}>
          undo
          <TimeRemaining>{timeRemaining}</TimeRemaining>
        </Undo>
      </Wrap>
    )
  )
}

export default React.memo(Toast)
