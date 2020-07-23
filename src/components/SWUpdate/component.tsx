import React, { useState, FC } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  z-index: 1;
  position: absolute;
  left: 48px;
  bottom: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const InnerWrap = styled.div`
  padding: var(--size-xlg);
  padding-right: 10rem;
  width: 100%;
  width: 26rem;
  line-height: 1.4;
  background: var(--charcoal);
  color: var(--white);
  border-radius: 2px;
  transition: opacity 0.2s ease-out;
  box-shadow: 0px -3px 6px -1px #ffc0c06b;

  &:hover {
    opacity: 0.8;
  }
`
const Message = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const Undo = styled.div`
  position: absolute;
  right: var(--size-lg);
  padding: var(--size-sm) var(--size-md);
  font-weight: bold;
  color: var(--charcoal);
  text-transform: uppercase;
  background-color: var(--white);
  font-size: 10px;
  border-radius: 21px;
`

const SWUpdate: FC<{ isUpdateAvailable: boolean }> = ({ isUpdateAvailable }) => {
  const [doNotUpdate, setDoNotUpdate] = useState(false)
  const onReload = () => window.location.reload(true)
  const onRemove = () => {
    setDoNotUpdate(true)
  }

  return !isUpdateAvailable || doNotUpdate ? null : (
    <Wrap>
      <InnerWrap onClick={onRemove}>
        <Message>An update is available</Message>
      </InnerWrap>
      <Undo onClick={onReload}>Update</Undo>
    </Wrap>
  )
}

export default React.memo(SWUpdate)
