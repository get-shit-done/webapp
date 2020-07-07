import React, { FC } from 'react'
import styled from 'styled-components'
import { rgbAdjust } from '../../styles'

const Wrap = styled.button<{ isInForm: boolean, accentColor: string }>`
  display: flex;
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

  ${p => p.isInForm && `
    margin-top: var(--size-xlg);
  `};

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

interface Props {
  isDisabled?: boolean,
  isInForm?: boolean,
  accentColor?: string,
  type: 'submit' | 'button' | 'reset',
  children: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: FC<Props> = ({ isDisabled, isInForm, accentColor, type, children, onClick }) => (
  <Wrap
    disabled={isDisabled}
    isInForm={isInForm}
    accentColor={accentColor}
    type={type}
    onClick={onClick}
  >
    {children}
  </Wrap>
)

export default Button
