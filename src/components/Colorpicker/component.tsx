import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../Application/Root'

const Wrap = styled.div`
  /* position: relative; */
`
const Toggle = styled.div`
  background-color: ${p => p.color || '#eee'};
  width: 16px;
  height: 16px;
  border-radius: 50%;
`
const Colors = styled.div<{ isOpen: boolean }>`
  z-index: 1;
  display: ${p => (p.isOpen ? 'flex' : 'none')};
  width: 208px;
  background-color: var(--charcoal);
  position: absolute;
  top: 0;
  right: 100%;
  flex-wrap: wrap;
  padding: 4px;
  margin-right: 36px;
  background: var(--charcoal);
  box-shadow: 3px 3px 8px -5px var(--charcoal);
`
const Color = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${p => p.color};

  &:hover {
    z-index: 1;
    box-shadow: 0 0 0 1px var(--charcoal);
  }
`
interface IColor {
  colorId: string
  colorValue: string
}
interface IProps {
  selectedColor: string
  setSelectedColor(color: IColor): void
}

const Colorpicker: FC<IProps> = ({ selectedColor, setSelectedColor }) => {
  const { colors } = useSelector((state: AppState) => state.settings)
  const [isOpen, toggleIsOpen] = useState(false)

  function handleClick(color: IColor) {
    setSelectedColor(color)
    toggleIsOpen(false)
  }
  return (
    <Wrap>
      <Toggle color={selectedColor} onClick={() => toggleIsOpen(!isOpen)}></Toggle>
      <Colors isOpen={isOpen}>
        {Object.entries(colors).map(([colorId, colorValue]) => (
          <Color color={colorValue} key={colorId} onClick={() => handleClick({ colorId, colorValue })} />
        ))}
      </Colors>
    </Wrap>
  )
}

export default Colorpicker
