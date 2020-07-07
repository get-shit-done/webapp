import { useState } from 'react'

interface IParams {
  ref: React.MutableRefObject<any>,
  inPixels: any,
  isReset?: boolean,
  axis: string,
}

const UseConvertPXToScale = () => {
  const [{ x, y }, set] = useState({ x: 1, y: 1 })

  const updateScale = ({ ref, inPixels, isReset, axis }: IParams) => {
    if (isReset) {
      return set({ x: 1, y: 1 })
    }
    const { width, height } = ref.current.getBoundingClientRect()
    const scale = 1 - inPixels / (axis === 'y' ? height : width)
    const scaleRounded = Number(scale.toFixed(4))
    set({ x, y, [axis]: scaleRounded })
  }

  return [{ scale: { x, y }, updateScale }]
}

export default UseConvertPXToScale
