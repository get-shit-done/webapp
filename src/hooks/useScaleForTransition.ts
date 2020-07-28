import { useState } from 'react'

interface IParams {
  ref: React.MutableRefObject<any>
  inPixels: number
  isReset?: boolean
  axis: string
  duration: number
}

const UseConvertPXToScale = () => {
  const [{ x, y, duration }, set] = useState({ x: 1, y: 1, duration: 0 })

  const updateScale = ({ ref, inPixels, isReset, axis, duration }: IParams) => {
    if (isReset) {
      return set({ x: 1, y: 1, duration })
    }
    const { width, height } = ref.current.getBoundingClientRect()
    const scale = 1 - inPixels / (axis === 'y' ? height : width)
    const scaleRounded = Number(scale.toFixed(4))
    set({ x, y, [axis]: scaleRounded, duration })
  }

  return [{ scale: { x, y, duration }, updateScale }]
}

export default UseConvertPXToScale
