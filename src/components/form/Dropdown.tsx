import React, { useState, FC } from 'react'
import styled from 'styled-components'
import chevronDownSvg from '../../assets/svg/chevron-down.svg'
import Placeholder from './Placeholder/component'
import { SvgStyled, Input, Wrap } from './shared'

const Header = styled.div`
  width: 100%;
  color: ${p => p.color};
`
const InputHidden = styled.input`
  display: none;
`
const List = styled.div<{ isOpen: boolean }>`
  display: ${p => p.isOpen ? 'flex' : 'none'};
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
const Item = styled.div<{ isActive: boolean, color: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px;
  color: ${p => p.isActive ? p.color : 'var(--isabelline)'};
  cursor: pointer;

  &:hover {
    color: ${p => p.isActive ? p.color : 'var(--white)'};
  };
`
const After = styled.div`
  width: 15px;
  height: 15px;
  background: ${p => p.color};
  border-radius: 50%;
  position: absolute;
  right: 0;
`

interface IItem {
  id: string,
  color?: { value: string },
  [key: string]: any,
}
interface IProps {
  theme: string,
  isInForm?: boolean,
  activeItem?: any,
  label: string,
  name?: string,
  list: IItem[],
  listKey: string,
  onSelect<T>(arg: T): void,
  inputRef(instance: HTMLInputElement): void,
}

const Dropdown: FC<IProps> = ({ theme, isInForm, activeItem = {}, label, name, list, listKey, onSelect, inputRef }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItemUpdated, setActiveItem] = useState(activeItem)

  function onItemSelect<T>(item: T): void {
    setActiveItem(item)
    onSelect(item)
    setIsOpen(false)
  }
  return (
    <Wrap
      theme={theme}
      isInForm={isInForm}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
    >
    {/* <Wrap theme={theme} isInForm={isInForm}> */}
      <Header color={activeItemUpdated.color?.value} onClick={() => setIsOpen(!isOpen)}>
        <Placeholder
          theme={theme}
          hasValue={activeItemUpdated.id !== undefined && activeItemUpdated.id !== ''}
        >
          {label}
        </Placeholder>
        <Input as="div">{activeItemUpdated[listKey]}</Input>
        {name && <InputHidden name={name} type="text" ref={inputRef} value={activeItemUpdated[listKey] || ''} />}
        <SvgStyled theme="light" svg={chevronDownSvg} />
      </Header>
      <List isOpen={isOpen}>
        {list.map((item: IItem) => {
          const { id, color } = item

          return (
            <Item
              isActive={id === activeItemUpdated.id}
              color={activeItemUpdated.color?.value}
              onClick={() => onItemSelect(item)}
              key={id}
            >
              {item[listKey]}
              <After color={color.value} />
            </Item>
          )
        })}
      </List>
    </Wrap>
  )
}

export default Dropdown
