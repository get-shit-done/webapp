import React, { FC } from 'react'
import { ButtonStyledWrap, IDumbButtonProps } from './shared'

const Button: FC<IDumbButtonProps> = ({ isDisabled, accentColor, type, children, onClick }) => (
  <ButtonStyledWrap disabled={isDisabled} accentColor={accentColor} type={type} onClick={onClick}>
    {children}
  </ButtonStyledWrap>
)

export default Button
