import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import App from '../component'

const ApplicationRoot = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

export default ApplicationRoot
