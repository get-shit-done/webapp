import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { reset } from '../styles'

import { homePath } from './paths'
import Home from '../pages/Home/Home'
import SWUpdate from '../components/SWUpdate/component'
import UseServiceWorker from '../hooks/useServiceWorker'
import { useSelector } from 'react-redux'
import { AppState } from './Root'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

const GlobalStyle = createGlobalStyle`
  ${reset};
`
const PageWrap = styled.div`
  display: grid;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`
// refetchOnMount, refetchOnWindowFocus
const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

const Application = () => {
  const [isUpdateAvailable] = UseServiceWorker(false)
  const { themeValues } = useSelector((state: AppState) => state.settings)

  return (
    <div>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryDevtools initialIsOpen />
        <GlobalStyle />
        <ThemeProvider theme={themeValues}>
          <PageWrap>
            <Switch>
              <Route exact path={homePath()} component={Home} />
              <Redirect to={homePath()} />
            </Switch>
            <SWUpdate isUpdateAvailable={isUpdateAvailable} />
          </PageWrap>
        </ThemeProvider>
      </ReactQueryCacheProvider>
    </div>
  )
}

export default Application
