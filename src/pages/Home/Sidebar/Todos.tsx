import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions as todoActions, NewTodo, Todo } from '../../../reducers/todos'
import { actions as toastActions } from '../../../components/Toast/reducer'
import binSvg from '../../../assets/svg/bin.svg'
import Svg from '../../../components/Svg/component'
import { AppState, useAppDispatch } from '../../../Application/Root'

import AddNewTodo from './AddNewTodo'

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

  ${p => p.isDone && `
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

const Todos = ({ isActive }: { isActive: boolean }) => {
  const { addTodoRequested, removeTodoRequested, toggleTodoRequested } = todoActions
  const { todos, asyncStatusTodos, asyncStatusTodo } = useSelector((state: AppState) => state.todos.present)
  const dispatch = useAppDispatch()
  const onAddNewTodo = (todo: NewTodo) => { dispatch(addTodoRequested(todo)) }
  const onRemoveTodo = (_id: string, todoName: string) => {
    dispatch(removeTodoRequested({ _id }))
    dispatch(toastActions.addToast({ prefix: 'task removed', message: todoName }))
  }

  return (
    <>
      <AddNewTodo addNewTodo={onAddNewTodo} />
      {todos.map(({ _id, todoName, isDone }: Todo) => (
        <Todo isDone={isDone} key={_id} onClick={() => dispatch(toggleTodoRequested({ _id, isDone: !isDone }))}>
          <Name>{todoName}</Name>
          <Actions>
            <Remove isDanger theme="light" svg={binSvg} onClick={() => onRemoveTodo(_id, todoName)} />
          </Actions>
          {asyncStatusTodo.isBusy && asyncStatusTodo.id === _id && 'yes'}
          {/* <Loader id={_id} /> */}
        </Todo>
      ))}
    </>
  )
}

export default Todos
