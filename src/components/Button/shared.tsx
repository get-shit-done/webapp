import styled from "styled-components";
import { rgbAdjust } from "../../styles";
import { styleDanger } from "../Svg/component";
import { AsyncStatus } from "../../constants";


export interface IDumbButtonProps {
  isDisabled?: boolean
  accentColor?: string
  type: 'submit' | 'button' | 'reset'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
}

export interface IAsyncButtonProps extends IDumbButtonProps {
  tooltipPosition?: 'left' | 'right'
  asyncStatus: AsyncStatus | AsyncStatus[]
}

export const SvgButtonWrap = styled.button<{ isError?: boolean }>`
  position: relative;
  cursor: pointer;
  ${p => p.isError && `
    * {
      ${styleDanger};
    };
  `};
`

export const ButtonStyledWrap = styled.button<{ isError?: boolean, accentColor: string }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0 var(--size-lg);
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

  ${p => p.isError && `
    background-color: var(--sunset-orange);
    color: var(--charcoal);

    &:hover {
      background-color: var(--red-orange);
      color: var(--charcoal);
    };
  `};

  &:disabled {
    pointer-events: none;
    background-color: var(--independence);
    color: var(--lavender);
  };
`

export const AsyncButtonContent = styled.div<{ isShow: boolean }>`
  opacity: ${p => p.isShow ? 1 : 0};
  visibility: ${p => p.isShow ? 'visible' : 'hidden'};
`
