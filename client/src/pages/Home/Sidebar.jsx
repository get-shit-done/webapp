import React from 'react'
import styled from 'styled-components'
import { STYLE_TRANSITION, STYLE_SIDEBAR_WIDTH_UNIT } from '../../styles'
import lisSvg from '../../assets/svg/list.svg'
import fullscreenSvg from '../../assets/svg/fullscreen.svg'
import Svg from '../../components/Svg/component'
import UseFullscreenToggle from '../../hooks/useFullscreenToggle'

const Wrap = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  font-size: 13px;
  color: var(--lavender);
`
const Tabs = styled.div`
  z-index: 1;
  height: 100%;
  background-color: var(--charcoal);
  width: 5rem;
  align-items: center;
  justify-content: center;
  display: flex;
`
const Toggles = styled.div`
  position: absolute;
  top: 16px;
`
const Tasks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;

  svg {
    fill: var(--roman-silver);
  };

  &:hover {
    svg {
      fill: var(--isabelline);
    };
  };

  ${p => p.isOpen && `
    svg {
      fill: var(--isabelline);
    };
  `};
`
const Toggle = styled(Svg)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  ${p => p.isActive && `
    svg {
      fill: var(--isabelline);
    };
  `};
`
const Tab = styled(Svg)`
  width: 2rem;
  height: 2rem;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  flex-direction: column;
  padding: var(--size-xlg);
  width: ${STYLE_SIDEBAR_WIDTH_UNIT}rem;
  color: var(--isabelline);
  background-color: var(--charcoal);
  box-shadow: inset -1px 0 0 0px var(--independence); 
  transform: translateX(100%);
  transition: transform ${STYLE_TRANSITION};

  ${p => p.isOpen && `
    transform: translateX(0);
  `};
`

const Sidebar = ({ isOpen, setIsOpen, children }) => {
  const [isFullscreen, setIsFullscreen] = UseFullscreenToggle(false)

  return (
    <Wrap>
      <Tabs>
        <Toggles>
          <Toggle isActive={isFullscreen} svg={fullscreenSvg} onClick={setIsFullscreen} />
        </Toggles>
        <Tasks isOpen={isOpen} onClick={setIsOpen}>
          <Tab svg={lisSvg} />
        </Tasks>
      </Tabs>
      <Content isOpen={isOpen}>
        {children}
      </Content>
    </Wrap>
  )
}

export default Sidebar
