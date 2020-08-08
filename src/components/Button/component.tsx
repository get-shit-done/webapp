import React, { FC } from 'react'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import { ButtonStyledWrap, ButtonContent } from './shared'

// TODO: share this interface with async
interface Props {
  isDisabled?: boolean
  accentColor?: string
  type: 'submit' | 'button' | 'reset'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  asyncStatus?: AsyncStatus
}

// TODO: remove async from this button variant
const Button: FC<Props> = ({ isDisabled, accentColor, type, children, onClick, asyncStatus }) => {
  const { isBusy } = determineAsyncStatus(asyncStatus)
  return (
    <ButtonStyledWrap disabled={isDisabled} accentColor={accentColor} type={type} onClick={onClick}>
      <ButtonContent isShow={!isBusy}>{children}</ButtonContent>
      {isBusy && <SpinnerLoader size={1.8} asyncStatus={asyncStatus} />}
    </ButtonStyledWrap>
  )
}

export default Button
