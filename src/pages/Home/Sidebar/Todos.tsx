import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions as todoActions, NewTodo, Todo } from '../../../reducers/todos'
import { actions as toastActions } from '../../../components/Toast/reducer'
import binSvg from '../../../assets/svg/bin.svg'
import errorApiSvg from '../../../assets/svg/error-api.svg'
import Svg, { styleDanger, styleDangerHover } from '../../../components/Svg/component'
import { AppState, useAppDispatch } from '../../../Application/Root'

import AddNewTodo from './AddNewTodo'
import { SpinnerLoader } from '../../../components/Loader'
import Tooltip from '../../../components/Tooltip/Tooltip'
import { determineAsyncStatus } from '../../../utils'

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
  ${styleDangerHover};
`
const ErrorSvg = styled(Svg)`
  ${styleDanger};
`
const TodosSpinner = styled(SpinnerLoader)`
`
const TodoSpinner = styled(SpinnerLoader)`
  justify-content: right;
`

const Todos = () => {
  const { addTodoRequested, removeTodoRequested, toggleTodoRequested } = todoActions
  const { todos, asyncStatus } = useSelector((state: AppState) => state.todos.present)
  const { getAll, add, toggle, remove } = asyncStatus
  const dispatch = useAppDispatch()
  const onAddNewTodo = (todo: NewTodo) => { dispatch(addTodoRequested(todo)) }
  const onRemoveTodo = (_id: string, todoName: string) => {
    dispatch(removeTodoRequested({ _id }))
    dispatch(toastActions.addToast({ prefix: 'task removed', message: todoName }))
  }
  // console.log(todoFocusId)

  return (
    <>
      <AddNewTodo addNewTodo={onAddNewTodo} />
      <TodosSpinner size={4} asyncStatus={asyncStatus.getAll} />
      {todos.map(({ _id, todoName, isDone }: Todo) => {
        const asyncStatusList = [toggle[_id], add[_id], remove[_id]]
        const { isBusy, isError } = determineAsyncStatus(asyncStatusList)

        return (
          <Todo
            isDone={isDone}
            isError={isError}
            key={_id}
            onClick={() => dispatch(toggleTodoRequested({ _id, isDone: !isDone }))}
          >
            <Name>{todoName}</Name>
            <Actions>
              {!isBusy && !isError && <Remove theme="light" svg={binSvg} onClick={() => onRemoveTodo(_id, todoName)} />}
            </Actions>
            <TodoSpinner asyncStatus={asyncStatusList} />
            <Tooltip isVisible={isError} tooltipText={toggle[_id]?.errorMessage}>
              <ErrorSvg svg={errorApiSvg} />
            </Tooltip>
          </Todo>
        )
      })}
    </>
  )
}

export default Todos
