import React from 'react'
import styled from 'styled-components'
import { rgbAdjust } from '../../styles'

const Wrap = styled.button`
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
const Button = ({ isDisabled, isInForm, accentColor, type = 'button', children, onClick }) => (
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
