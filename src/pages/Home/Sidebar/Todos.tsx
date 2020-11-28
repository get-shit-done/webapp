import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { actions as todoActions, NewTodo, Todo } from '../../../reducers/todos'
import { actions as toastActions } from '../../../components/Toast/reducer'
import binSvg from '../../../assets/svg/bin.svg'
import Svg, { styleDangerHover } from '../../../components/Svg/component'
import { AppState, useAppDispatch } from '../../../Application/Root'

import AddNewTodo from './AddNewTodo'
import { SpinnerLoader } from '../../../components/Loader'
import { determineAsyncStatus } from '../../../utils'
import { TextError } from '../../../components/error'
import { AsyncSvgButton } from '../../../components/Button'
import axios from 'axios'
import { API_TODOS, API_TODOS_BY_ID, getTodos, updateTodo } from '../../../api'
import { useMutation, useQuery, useQueryCache } from 'react-query'

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
const Name = styled.div`
  flex-grow: 1;
`
const Actions = styled.div`
  position: absolute;
  right: 0;
  display: flex;
`
const Remove = styled(Svg)`
  ${styleDangerHover};
`
const TodosSpinner = styled(SpinnerLoader)`
`


export function useTodos() {
  return useQuery<Todo[], Error>(
    'todos',
    getTodos
  )
}

export function useUpdateTodo() {
  const queryCache = useQueryCache()

  return useMutation(updateTodo, {
    onMutate: newTodo => {
      queryCache.cancelQueries('todos')
      const previousTodos = queryCache.getQueryData('todos')
      queryCache.setQueryData('todos', (oldQuery: Todo[]) => oldQuery.map(query => {
        if (query._id !== newTodo._id) return query
        return {
          ...query,
          ...newTodo,
        }
      }))
  
      return () => queryCache.setQueryData('todos', previousTodos)
    },
    // If the mutation fails, use the rollback function we returned above
    // onError: (err, newTodo, rollback) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries('todos')
    },
  })
}

const Todos = () => {
  const { isLoading, isError, data: todos = [], error } = useTodos()
  // const [mutate] = useMutation(updateTodo, {
  //  onSuccess: (data, variables) => queryCache.setQueryData(['todos', { _id: variables._id, isDone: variables.isDone }], data),
  // })


  const [editMutate] = useUpdateTodo()


  const onEdit = ({ _id, isDone }: { _id: string, isDone: boolean }) => {
    console.log(_id, isDone)
    editMutate({ _id, isDone })
  }


  const { addTodoRequested, removeTodoRequested } = todoActions
  const { asyncStatus } = useSelector((state: AppState) => state.todos.present)
  // const { getAll, add, toggle, remove } = asyncStatus
  const dispatch = useAppDispatch()
  const onAddNewTodo = (todo: NewTodo) => { dispatch(addTodoRequested(todo)) }
  const onRemoveTodo = (_id: string, todoName: string) => {
    dispatch(removeTodoRequested({ _id }))
    dispatch(toastActions.addToast({ prefix: 'task removed', message: todoName }))
  }

  return (
    <>
      {/* {isLoading && <div>LOADING:ADINGLOADING</div>}
      {isError && <div>Error: {error.message}</div>} */}
      <AddNewTodo addNewTodo={onAddNewTodo} />
      {/* <TodosSpinner size={4} asyncStatus={getAll} />
      <TextError asyncStatus={getAll} /> */}
      {todos.map(({ _id, todoName, isDone }: Todo) => {
        // const asyncStatusList = [toggle[_id], add[_id], remove[_id]]
        // const { isError } = determineAsyncStatus(asyncStatusList)

        return (
          <Todo isDone={isDone} isError={isError} key={_id}>
            {/* <Name onClick={() => dispatch(toggleTodoRequested({ _id, isDone: !isDone }))}>{todoName}</Name> */}
            <Name onClick={() => onEdit({ _id, isDone: !isDone })}>{todoName}</Name>
            <Actions>
              {/* <AsyncSvgButton asyncStatus={asyncStatusList}> */}
                <Remove theme="light" svg={binSvg} onClick={() => onRemoveTodo(_id, todoName)} />
              {/* </AsyncSvgButton> */}
            </Actions>
          </Todo>
        )
      })}
    </>
  )
}

export default Todos
