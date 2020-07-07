import styled from 'styled-components'

import Svg, { CN_SVG } from '../Svg/component'

export const STYLE_COLOR_LIGHT = 'var(--isabelline)'
export const STYLE_COLOR_DARK = 'red'

const STYLE_BOX_SHADOW_OFFSET = '0 2px 0 -1px'
export const STYLE_BORDER_COLOR = 'rgba(213, 213, 213, 0.62)'

export const STYLE_UNDERLINE_LIGHT = `${STYLE_BOX_SHADOW_OFFSET} var(--independence)`
export const STYLE_UNDERLINE_HOVER_LIGHT = `${STYLE_BOX_SHADOW_OFFSET} var(--gainsboro)`
export const STYLE_UNDERLINE_ERROR = `${STYLE_BOX_SHADOW_OFFSET} var(--sunset-orange)`

export const STYLE_PLACEHOLDER_COLOR_DARK = 'rgba(0, 0, 0, 0.3)'
export const STYLE_PLACEHOLDER_COLOR_LIGHT = 'rgba(255, 255, 255, 0.6)'
export const STYLE_HEIGHT = '3.2rem'


export const Wrap = styled.div<{ isInForm: boolean }>`
  display: flex;
  position: relative;
  color: ${p => p.theme === 'light' ? STYLE_COLOR_LIGHT : STYLE_COLOR_DARK};
  outline: none;

  ${p => p.isInForm && `
    margin-top: var(--size-sm);

    &:first-child {
      margin-top: 0;
    };
  `};
`

export const Input = styled.input<{ isError?: string }>`
  display: flex;
  align-items: center;
  padding-top: var(--size-sm);
  width: 100%;
  height: ${STYLE_HEIGHT};
  box-shadow: ${p => p.isError ? STYLE_UNDERLINE_ERROR : STYLE_UNDERLINE_LIGHT};
  background-color: transparent;
  color: inherit;

  &:hover {
    ${p => !p.isError && `
      box-shadow: ${STYLE_UNDERLINE_HOVER_LIGHT};

      & ~ .${CN_SVG} {
        fill: var(--sonic-silver);
      };
    `};
  };
`

export const SvgStyled = styled(Svg)`
  position: absolute;
  right: var(--size-xsm);
  transform: translate(0, -50%);
  top: 50%;
  width: 1.2rem;
  height: 1.2rem;

  ${Wrap}:hover & {
    svg {
      fill: var(--gainsboro);
    };
  };
`
