import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AsyncStatus {
  isInitial: boolean
  isBusy: boolean
  isDone: boolean
  errorMessage?: string
  id?: string
}
const asyncStatusInitial = {
  isInitial: true,
  isBusy: false,
  isDone: false,
}
const asyncStatusRequested = (id?: string) => ({
  isInitial: false,
  isBusy: true,
  isDone: false,
  id,
})
const asyncStatusSuccess = (id?: string) => ({
  isInitial: false,
  isBusy: false,
  isDone: true,
  id,
})
const asyncStatusFail = (errorMessage: string, id?: string): AsyncStatus => ({
  isInitial: false,
  isBusy: false,
  isDone: false,
  errorMessage,
  id,
})

export interface NewTodo {
  todoName: string
}
export interface Todo extends NewTodo {
  _id: string
  isDone: boolean
}
interface IInitialState {
  todos: Todo[]
  asyncStatusTodos: AsyncStatus
  asyncStatusTodo: AsyncStatus
}

const initialState: IInitialState = {
  asyncStatusTodos: asyncStatusInitial,
  asyncStatusTodo: asyncStatusInitial,
  todos: [],
}

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodoRequested(state, { payload: { todoName } }: PayloadAction<NewTodo>): void {
      state.todos.push({
        _id: 'new-todo',
        isDone: false,
        todoName,
      })
    },
    addTodoSucceeded(state, { payload }: PayloadAction<{ _id: string }>): void {
      const newTodo = state.todos.find(x => x._id === 'new-todo')
      newTodo._id = payload._id
    },
    addTodoFailed(state, { payload }) {
      console.log('add todo failed')
    },
    removeTodoRequested(state, { payload }: PayloadAction<{ _id: string }>): void {
      state.todos = state.todos.filter(x => x._id !== payload._id)
    },
    removeTodoSucceeded(state, { payload }) {
      console.log('remove success')
    },
    removeTodoFailed(state, { payload }) {
      console.log('remove todo failed')
    },
    toggleTodoRequested(state, { payload }: PayloadAction<{ _id: string; isDone: boolean }>): void {
      const todo = state.todos.find(x => x._id === payload._id)
      todo.isDone = payload.isDone
      state.asyncStatusTodo = asyncStatusRequested(payload._id)
    },
    toggleTodoSucceeded(state, { payload }) {
      console.log('toggle todo succeded')
      state.asyncStatusTodo = asyncStatusSuccess(payload._id)
    },
    toggleTodoFailed(state, { payload }) {
      console.log('toggle todo failed')
      state.asyncStatusTodo = asyncStatusFail('whoops', payload._id)
    },
    getTodosRequested(state) {
      state.asyncStatusTodos = asyncStatusRequested()
    },
    getTodosSucceeded(state, { payload }: PayloadAction<Todo[]>) {
      console.log(payload)
      state.todos = payload
    },
    getTodosFailed(state, action) {
      console.log('get todos failed')
    },
  },
})
