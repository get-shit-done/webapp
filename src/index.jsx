import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Application/component'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
ReactDOM.render((
  <Root />
), document.getElementById('app'))
