import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { useAppDispatch } from './Root/store'
import { reset } from '../styles'

import { homePath } from './paths'
import Home from '../pages/Home/Home'
import SWUpdate from '../components/SWUpdate/component'
import UseServiceWorker from '../hooks/useServiceWorker'
import { actions } from '../reducers/calendar'

const GlobalStyle = createGlobalStyle`
  ${reset};
`
const PageWrap = styled.div`
  display: grid;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`

const Application = () => {
  const [isUpdateAvailable] = UseServiceWorker(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actions.getTasksRequested())
  }, [])

  return (
    <div>
      <GlobalStyle />
      <PageWrap>
        <Switch>
          <Route exact path={homePath()} component={Home} />
          <Redirect to={homePath()} />
        </Switch>
        <SWUpdate isUpdateAvailable={isUpdateAvailable} />
      </PageWrap>
    </div>
  )
}

export default Application
