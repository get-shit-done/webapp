import { useState, useEffect } from 'react'

const UseUpdateServiceWorker = (initialState: boolean) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('SW registered')
  
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setState(true)
              }
            })
          })
  
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
      })
    }
  }, [])

  return [state]
}

export default UseUpdateServiceWorker
