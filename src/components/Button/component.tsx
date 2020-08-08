import React, { FC } from 'react'
import styled from 'styled-components'
import { rgbAdjust } from '../../styles'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'

const Wrap = styled.button<{ accentColor: string }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0 var(--size-lg);
  padding-bottom: 1px;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: var(--capri);
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--font-size-md);
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: #58cbff;
    color: var(--white);
  };

  ${p => p.accentColor && `
    background-color: ${p.accentColor};
    color: ${rgbAdjust(p.accentColor, -100)};

    &:hover {
      background-color: ${rgbAdjust(p.accentColor, -20)};
      color: ${rgbAdjust(p.accentColor, -120)};
    };
  `};

  &:disabled {
    pointer-events: none;
    background-color: var(--independence);
    color: var(--lavender);
  };
`
const Content = styled.div<{ isBusy: boolean }>`
  opacity: ${p => p.isBusy ? 0 : 1};
  visibility: ${p => p.isBusy ? 'hidden' : 'visible'};
`

interface Props {
  isDisabled?: boolean
  accentColor?: string
  type: 'submit' | 'button' | 'reset'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  asyncStatus?: AsyncStatus
}

const Button: FC<Props> = ({ isDisabled, accentColor, type, children, onClick, asyncStatus }) => {
  const { isBusy } = determineAsyncStatus(asyncStatus)
  return (
    <Wrap disabled={isDisabled} accentColor={accentColor} type={type} onClick={onClick}>
      <Content isBusy={isBusy}>{children}</Content>
      {isBusy && <SpinnerLoader size={1.8} asyncStatus={asyncStatus} />}
    </Wrap>
  )
}

export default Button
