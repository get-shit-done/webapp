import React, { Suspense, FC, useState } from 'react'
import styled from 'styled-components'
import { STYLE_SIDEBAR_WIDTH_UNIT } from '../../../styles'
import listSvg from '../../../assets/svg/list.svg'
import cogSvg from '../../../assets/svg/cog.svg'
import fullscreenSvg from '../../../assets/svg/fullscreen.svg'
import Svg from '../../../components/Svg/component'
import UseFullscreenToggle from '../../../hooks/useFullscreenToggle'

const Todos = React.lazy(() => import('./Todos'))
const Settings = React.lazy(() => import('./Settings'))

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
  flex-direction: column;
`
const Toggles = styled.div`
  position: absolute;
  top: 16px;
`
const Tasks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;

  svg {
    fill: var(--roman-silver);
  }

  &:hover {
    svg {
      fill: var(--isabelline);
    }
  }

  ${p =>
    p.isOpen &&
    `
    svg {
      fill: var(--isabelline);
    };
  `};
`
const Toggle = styled(Svg) <{ isActive: boolean }>`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  ${p =>
    p.isActive &&
    `
    svg {
      fill: var(--isabelline);
    };
  `};
`
const Tab = styled(Svg)`
  width: 2rem;
  height: 2rem;
`

const Content = styled.div<{ isOpen: boolean }>`
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
  transition: transform 0.2s var(--transition-type);

  ${p =>
    p.isOpen &&
    `
    transform: translateX(0);
  `};
`

interface Props {
  isOpen: boolean
  setIsOpen: any
}

const Sidebar: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [isFullscreen, setIsFullscreen] = UseFullscreenToggle(false)
  const [activeTabId, setActiveTab] = useState('todos')
  const tabs = [{ id: 'todos', component: Todos }, { id: 'settings', component: Settings }]
  const ActiveTab = tabs.find(tab => tab.id === activeTabId).component

  return (
    <Wrap>
      <Suspense fallback={<div />}>
        <Tabs>
          <Toggles>
            <Toggle isActive={isFullscreen} svg={fullscreenSvg} onClick={setIsFullscreen} />
          </Toggles>
          <Tasks isOpen={isOpen} onClick={setIsOpen}>
            <Tab svg={listSvg} onClick={() => setActiveTab('todos')} />
            <Tab svg={cogSvg} onClick={() => setActiveTab('settings')} />
          </Tasks>
        </Tabs>
        <Content isOpen={isOpen}>
          <ActiveTab />
        </Content>
      </Suspense>
    </Wrap>
  )
}

export default Sidebar
