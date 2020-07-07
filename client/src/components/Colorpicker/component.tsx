import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../Application/Root/reducers'

const Wrap = styled.div`
  position: relative;
`
const Toggle = styled.div`
  background-color: ${p => p.color || '#eee'};
  width: 16px;
  height: 16px;
  border-radius: 50%;
`
const Colors = styled.div<{ isOpen: boolean }>`
  display: ${p => p.isOpen ? 'flex' : 'none'};
  width: 208px;
  background-color: var(--charcoal);
  position: absolute;
  top: 0;
  left: 100%;
  flex-wrap: wrap;
  padding: 4px;
  margin-left: 28px;
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
  };
`
interface Props {
  selectedColor: string,
  setSelectedColor (color: string): void,
}

const Colorpicker: FC<Props> = ({ selectedColor, setSelectedColor }) => {
  const { colors } = useSelector((state: RootState) => state.settings)
  const [isOpen, toggleIsOpen] = useState(false)

  function handleClick(color: string) {
    setSelectedColor(color)
    toggleIsOpen(false)
  }
  return (
    <Wrap>
      <Toggle color={selectedColor} onClick={() => toggleIsOpen(!isOpen)}></Toggle>
      <Colors isOpen={isOpen}>
        {Object.entries(colors).map(([key, value]) => (
          <Color color={value} key={key} onClick={() => handleClick(value)} /> // potential bug
        ))}
      </Colors>
    </Wrap>
  )
}

export default Colorpicker
