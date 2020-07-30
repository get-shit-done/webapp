import React, { Suspense, FC, useState } from 'react'
import styled from 'styled-components'
import { STYLE_SIDEBAR_WIDTH_UNIT } from '../../../styles'
import listSvg from '../../../assets/svg/list.svg'
import cogSvg from '../../../assets/svg/cog.svg'
import fullscreenSvg from '../../../assets/svg/fullscreen.svg'
import sunSvg from '../../../assets/svg/sun.svg'
import moonSvg from '../../../assets/svg/moon.svg'
import Svg from '../../../components/Svg/component'
import UseFullscreenToggle from '../../../hooks/useFullscreenToggle'
import TabHOC from './TabHOC'
import { useAppDispatch, AppState } from '../../../Application/Root'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/settings'
import { ENUM_THEMES } from '../../../enums'

const Todos = React.lazy(() => import('./Todos'))
const Settings = React.lazy(() => import('./Settings'))

const Wrap = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  font-size: 13px;
  color: var(--lavender);
`
const InnerWrap = styled.div`
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
  top: 6px;
`
const Toggle = styled(Svg) <{ isActive: boolean }>`
  padding: 1rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;

  ${p =>
    p.isActive &&
    `
    svg {
      fill: var(--isabelline);
    };
  `};
`
const TabToggle = styled.div<{ isActive: boolean }>`
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
  overflow: hidden;

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
  const dispatch = useAppDispatch()
  const { themeName } = useSelector((state: AppState) => state.settings)
  const [isFullscreen, setIsFullscreen] = UseFullscreenToggle(false)
  const [activeTabId, setActiveTab] = useState(undefined)
  const tabs = [
    {
      id: 'todos',
      Component: TabHOC(Todos),
      svg: listSvg,
    },
    {
      id: 'settings',
      Component: TabHOC(Settings),
      svg: cogSvg,
    }
  ]
  const handleTabClick = (id: string) => {
    setActiveTab(id === activeTabId ? undefined : id)
    !activeTabId && setIsOpen(true)
    activeTabId === id && setIsOpen(false)
  }

  return (
    <Wrap>
      <Suspense fallback={<div />}>
        <InnerWrap>
          <Toggles>
            <Toggle isActive={isFullscreen} svg={fullscreenSvg} onClick={setIsFullscreen} />
            <Toggle
              isActive
              svg={themeName === ENUM_THEMES.dark ? moonSvg : sunSvg}
              onClick={() => dispatch(actions.activateTheme({ theme: themeName }))}
            />
          </Toggles>

          {tabs.map(({ id, svg }) => (
            <TabToggle key={id} isActive={id === activeTabId} onClick={() => handleTabClick(id)}>
              <Tab svg={svg} />
            </TabToggle>
          ))}
        </InnerWrap>
        <Content isOpen={isOpen}>
          {tabs.map(({ id, Component }) => <Component key={id} isActive={id === activeTabId} title={id} />)}
        </Content>
      </Suspense>
    </Wrap>
  )
}

export default Sidebar
