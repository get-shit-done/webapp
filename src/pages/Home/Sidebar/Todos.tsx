import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions as todoActions, NewTodo, Todo } from '../../../reducers/todos'
import { actions as toastActions } from '../../../components/Toast/reducer'
import binSvg from '../../../assets/svg/bin.svg'
import Svg from '../../../components/Svg/component'
import { AppState, useAppDispatch } from '../../../Application/Root'

import AddNewTodo from './AddNewTodo'
import { SpinnerLoader } from '../../../components/Loader'

const Todo = styled.div<{ isDone: boolean, isError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--size-xsm) var(--size-lg) var(--size-xsm) 0;
  cursor: pointer;
  line-height: 1.5;

  &:hover {
    color: var(--cool-gray);
  };

  ${p => p.isDone && `
    color: var(--rhythm);

    &:hover {
      color: var(--rhythm);
    };
  `};

  ${p => p.isError && `
    color: var(--sunset-orange);

    &:hover {
      color: var(--sunset-orange);
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
const TodosSpinner = styled(SpinnerLoader)`
`
const TodoSpinner = styled(SpinnerLoader)`
  justify-content: right;
`

const Todos = () => {
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
      <TodosSpinner size={4} asyncStatus={asyncStatusTodos} />
      {todos.map(({ _id, todoName, isDone }: Todo) => (
        <Todo
          isDone={isDone}
          isError={_id === asyncStatusTodo.asyncId}
          key={_id}
          onClick={() => dispatch(toggleTodoRequested({ _id, isDone: !isDone }))}
        >
          <Name>{todoName}</Name>
          <Actions>
            {_id !== asyncStatusTodo.asyncId && (
              <Remove
                isDanger
                theme="light"
                svg={binSvg}
                onClick={() => onRemoveTodo(_id, todoName)}
              />
            )}
          </Actions>
          <TodoSpinner id={_id} asyncStatus={asyncStatusTodo} />
          {asyncStatusTodo.errorMessage && _id === asyncStatusTodo.asyncId && asyncStatusTodo.errorMessage}
        </Todo>
      ))}
    </>
  )
}

export default Todos
