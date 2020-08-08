import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../../Application/Root'

const Wrap = styled.div`
  flex-grow: 1;
`
const Toggle = styled.div`
  display: flex;
  align-items: center;
`;
const ColorCircle = styled.div<{ isOpen: boolean; color: string }>`
  position: relative;
  width: 16px;
  height: 16px;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
  };

  &::before {
    background-color: transparent;
    scale: 1;
    transition: scale 0.1s ease-out;
  };

  &::after {
    background-color: ${p => p.color || '#eee'};
    box-shadow: 1px 1px 2px var(--charcoal);
  };

  ${p => p.isOpen && `
    &::before {
      background-color: #5b5e69;
      scale: 1.8;
    };
  `};
`

const Label = styled.div`
  margin-left: var(--size-lg);
  /* flex-grow: 1; */
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
const Color = styled.div<{ isActive: boolean; color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${p => p.color};

  ${p => p.isActive && `
    z-index: 1;
    box-shadow: 0 0 0 1px var(--charcoal);
  `};

  &:hover {
    z-index: 1;
    box-shadow: 0 0 0 1px var(--charcoal);
  };
`
interface IColor {
  colorId: string
  colorValue: string
}
interface IProps {
  selectedColorValue: string
  label: string
  setSelectedColor(color: IColor): void
}

const Colorpicker: FC<IProps> = ({ selectedColorValue, label, setSelectedColor }) => {
  const { colors } = useSelector((state: AppState) => state.settings)
  const [isOpen, toggleIsOpen] = useState(false)

  function handleClick(color: IColor) {
    setSelectedColor(color)
    toggleIsOpen(false)
  }
  return (
    <Wrap>
      <Toggle onClick={() => toggleIsOpen(!isOpen)}>
        <ColorCircle isOpen={isOpen} color={selectedColorValue} />
        <Label>{label}</Label>
      </Toggle>
      <Colors isOpen={isOpen}>
        {Object.entries(colors).map(([colorId, colorValue]) => (
          <Color
            isActive={colorValue === selectedColorValue}
            color={colorValue}
            key={colorId}
            onClick={() => handleClick({ colorId, colorValue })}
          />
        ))}
      </Colors>
    </Wrap>
  )
}

export default Colorpicker
