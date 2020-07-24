import React, { useState, FC } from 'react'
import styled from 'styled-components'
import chevronDownSvg from '../../assets/svg/chevron-down.svg'
import Placeholder from './Placeholder/component'
import { SvgStyled, Input, Wrap } from './shared'
import { useSelector } from 'react-redux'
import { AppState } from '../../Application/Root'
import { IGroup } from '../../reducers/settings'

const Header = styled.div<{ color: string }>`
  width: 100%;
  color: ${p => p.color};
`
const InputHidden = styled.input`
  display: none;
`
const List = styled.div<{ isOpen: boolean }>`
  display: ${p => (p.isOpen ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  background-color: #525769;
  padding: 8px;
  z-index: 1;
  top: 0;
  left: -12px;
  right: -12px;
  border-radius: 2px;
  box-shadow: 3px 3px 8px -5px #343742;
`
const Item = styled.div<{ isActive: boolean; color: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px;
  color: ${p => (p.isActive ? p.color : 'var(--isabelline)')};
  cursor: pointer;

  &:hover {
    color: ${p => (p.isActive ? p.color : 'var(--white)')};
  }
`
const After = styled.div`
  width: 15px;
  height: 15px;
  background: ${p => p.color};
  border-radius: 50%;
  position: absolute;
  right: 0;
`

interface IProps {
  theme: string
  isInForm?: boolean
  activeItem?: any
  label: string
  name?: string
  onSelect(item: any): void
  inputRef(instance: HTMLInputElement): void
}

const Dropdown: FC<IProps> = ({ theme, isInForm, activeItem = {}, label, name, onSelect, inputRef }) => {
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const [isOpen, setIsOpen] = useState(false)

  const accentColor = colors[activeItem.colorId]
  console.log(accentColor)

  function onItemSelect(item: any): void {
    onSelect(item)
    setIsOpen(false)
  }
  return (
    <Wrap theme={theme} isInForm={isInForm} tabIndex={0} onBlur={() => setIsOpen(false)}>
      <Header color={accentColor} onClick={() => setIsOpen(!isOpen)}>
        <Placeholder theme={theme} hasValue={activeItem.id!!}>
          {label}
        </Placeholder>
        <Input as="div">{activeItem.name}</Input>
        {name && <InputHidden name={name} type="text" ref={inputRef} value={activeItem.name || ''} />}
        <SvgStyled theme="light" svg={chevronDownSvg} />
      </Header>
      <List isOpen={isOpen}>
        {groups.map((item: IGroup) => (
          <Item
            isActive={item.id === activeItem.id}
            color={accentColor}
            onClick={() => onItemSelect(item)}
            key={item.id}
          >
            {item.name}
            <After color={colors[item.colorId]} />
          </Item>
        ))}
      </List>
    </Wrap>
  )
}

export default Dropdown
