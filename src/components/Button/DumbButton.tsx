import React, { FC } from 'react'
import { ButtonStyledWrap } from './shared'

// TODO: share this interface with async
interface Props {
  isDisabled?: boolean
  accentColor?: string
  type: 'submit' | 'button' | 'reset'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: FC<Props> = ({ isDisabled, accentColor, type, children, onClick }) => (
  <ButtonStyledWrap disabled={isDisabled} accentColor={accentColor} type={type} onClick={onClick}>
    {children}
  </ButtonStyledWrap>
)

export default Button
