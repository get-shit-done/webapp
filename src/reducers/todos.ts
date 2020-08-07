import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AsyncStatus,
  asyncStatusInitial,
  asyncStatusRequested,
  asyncStatusSuccess,
  asyncStatusFail,
} from '../constants'

export interface NewTodo {
  todoName: string
}
export interface Todo extends NewTodo {
  _id: string
  isDone: boolean
}
interface IInitialState {
  todos: Todo[]
  todoFocusId: string
  asyncStatus: {
    getAll: AsyncStatus
    add: {
      [key: string]: AsyncStatus
    }
    toggle: {
      [key: string]: AsyncStatus
    }
    remove: {
      [key: string]: AsyncStatus
    }
  }
}

const initialState: IInitialState = {
  asyncStatus: {
    getAll: asyncStatusInitial,
    add: {},
    toggle: {},
    remove: {},
  },
  todos: [],
  todoFocusId: undefined,
}

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodoRequested(state, { payload: { todoName } }: PayloadAction<NewTodo>): void {
      state.todos.push({
        _id: 'new-todo',
        isDone: false,
        todoName,
      })
      // state.todoFocusId = 'new-todo'
      state.asyncStatus.add['new-todo'] = asyncStatusRequested
    },
    addTodoSucceeded(state, { payload }: PayloadAction<{ _id: string }>): void {
      const newTodo = state.todos.find(x => x._id === 'new-todo')
      newTodo._id = payload._id
      // state.todoFocusId = undefined
      state.asyncStatus.add['new-todo'] = asyncStatusSuccess
    },
    addTodoFailed(state, { payload }) {
      console.log('add todo failed')
      state.asyncStatus.add['new-todo'] = asyncStatusFail('fail fail')
      // state.todoFocusId = undefined
    },
    removeTodoRequested(state, { payload }: PayloadAction<{ _id: string }>): void {
      state.todos = state.todos.filter(x => x._id !== payload._id)
      state.asyncStatus.remove[payload._id] = asyncStatusRequested
      // state.todoFocusId = payload._id
    },
    removeTodoSucceeded(state, { payload }) {
      console.log('remove success')
      state.asyncStatus.remove[payload._id] = asyncStatusSuccess
      // state.todoFocusId = undefined
    },
    removeTodoFailed(state, { payload }) {
      console.log('remove todo failed')
      state.asyncStatus.remove[payload._id] = asyncStatusFail('fail fail')
      // state.todoFocusId = undefined
    },
    toggleTodoRequested(state, { payload }: PayloadAction<{ _id: string; isDone: boolean }>): void {
      const todo = state.todos.find(x => x._id === payload._id)
      todo.isDone = payload.isDone
      state.asyncStatus.toggle[payload._id] = asyncStatusRequested
      // state.todoFocusId = payload._id
    },
    toggleTodoSucceeded(state, { payload }) {
      console.log('toggle todo succeded')
      state.asyncStatus.toggle[payload._id] = asyncStatusSuccess
      // state.todoFocusId = undefined
    },
    toggleTodoFailed(state, { payload }) {
      console.log('toggle todo failed')
      state.asyncStatus.toggle[payload._id] = asyncStatusFail(payload.error)
      // state.todoFocusId = undefined
    },
    getTodosRequested(state) {
      state.asyncStatus.getAll = asyncStatusRequested
    },
    getTodosSucceeded(state, { payload }: PayloadAction<Todo[]>) {
      console.log(payload)
      state.todos = payload
      state.asyncStatus.getAll = asyncStatusSuccess
    },
    getTodosFailed(state, action) {
      console.log('get todos failed')
      state.asyncStatus.getAll = asyncStatusFail('fail')
    },
  },
})
