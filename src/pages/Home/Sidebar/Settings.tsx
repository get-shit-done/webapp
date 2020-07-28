import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions as todoActions, Todo } from '../../../reducers/todos'
import { actions as toastActions } from '../../../components/Toast/reducer'
import binSvg from '../../../assets/svg/bin.svg'
import Svg from '../../../components/Svg/component'
import { AppState, useAppDispatch } from '../../../Application/Root'

import AddNewTodo from './AddNewTodo'

const Title = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 3.4rem;
`
const Todo = styled.div<{ isDone: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--size-xsm) var(--size-lg) var(--size-xsm) 0;
  cursor: pointer;
  line-height: 1.5;

  &:hover {
    color: var(--cool-gray);
  }

  ${p =>
    p.isDone &&
    `
    color: var(--rhythm);

    &:hover {
      color: var(--rhythm);
    };
  `};
`
const Name = styled.div``
const Actions = styled.div`
  display: none;
  position: absolute;
  right: 0;

  ${Todo}:hover & {
    display: flex;
  }
`
const Remove = styled(Svg)`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`

const Settings = () => {

  return (
    <>
      <Title>Settings</Title>

    </>
  )
}

export default Settings
