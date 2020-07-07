import { useState } from 'react'

const UseFullscreenToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setIsFullscreen] = useState(initialState)

  function toggleFullScreen(): void {
    if (!document.fullscreenElement) {
        setIsFullscreen(true)
        document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return [state, toggleFullScreen]
}

export default UseFullscreenToggle
