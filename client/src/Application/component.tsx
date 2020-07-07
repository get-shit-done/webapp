import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import store from './Root/store'
import { reset } from '../styles'

import { homePath } from './paths'
import Home from '../pages/Home/Home'
import SWUpdate from '../components/SWUpdate/component'
import UseServiceWorker from '../hooks/useServiceWorker'

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

  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <PageWrap>
          <Switch>
            <Route exact path={homePath()} component={Home} />
            <Redirect to={homePath()} />
          </Switch>
          <SWUpdate isUpdateAvailable={isUpdateAvailable} />
        </PageWrap>
      </Router>
    </Provider>
  )
}

export default Application
