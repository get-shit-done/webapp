import React, { Suspense, useState, useRef } from 'react'

import styled from 'styled-components'
import { STYLE_TRANSITION, STYLE_SIDEBAR_WIDTH_UNIT } from '../../styles'
import Toast from '../../components/Toast/component'

const Todos = React.lazy(() => import('./Todos'))
import Sidebar from './Sidebar'
import HourLabels from './HourLabels'
import DayLabels from './DayLabels'
import Calendar from './Calendar'
import useScaleForTransition from '../../hooks/useScaleForTransition'


const PageWrap = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: var(--charcoal);
`
const Wrap = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  padding-top: 24px;
  padding-left: 24px;
  width: 100%;
  background-color: var(--jet);
  will-change: padding;
  transform-origin: left;
  transition: transform ${STYLE_TRANSITION};
  ${p => p.isOpen && `
    transform: scale(${p.scaleTest.x}, ${p.scaleTest.y});
  `};
`
const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: var(--white);
`

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [{ scale: wrapScale, updateScale: setWrapScale }] = useScaleForTransition()
  const [{ scale: calendarScale, updateScale: setCalendarScale }] = useScaleForTransition()
  const wrapRef = useRef(null)
  const calendarRef = useRef(null)

  const onSetCalendarScale = ({ isReset, axis }) => {
    setCalendarScale({ ref: calendarRef, inPixels: 26, isReset, axis })
  }
  const onSidebarToggle = () => {
    setIsOpen(o => !o)
    setWrapScale({ ref: wrapRef, inPixels: STYLE_SIDEBAR_WIDTH_UNIT * 10, axis: 'x' })
  }

  return (
    <PageWrap>
      <Wrap isOpen={isOpen} scaleTest={wrapScale} ref={wrapRef}>
        <HourLabels onHover={onSetCalendarScale} />
        <CalendarWrap ref={calendarRef}>
          <DayLabels onHover={onSetCalendarScale} />
          <Calendar scale={calendarScale} />
        </CalendarWrap>
        <Toast />
      </Wrap>
      
      <Sidebar isOpen={isOpen} setIsOpen={onSidebarToggle}>
        <Suspense fallback={<div />}>
          <Todos />
        </Suspense>
      </Sidebar>
    </PageWrap>
  )
}

export default Home
