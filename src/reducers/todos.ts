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
      state.asyncStatus.add['new-todo'] = asyncStatusRequested
    },
    addTodoSucceeded(state, { payload }: PayloadAction<{ _id: string }>): void {
      const newTodo = state.todos.find(x => x._id === 'new-todo')
      newTodo._id = payload._id
      state.asyncStatus.add['new-todo'] = asyncStatusSuccess
    },
    addTodoFailed(state, { payload }) {
      state.asyncStatus.add['new-todo'] = asyncStatusFail(payload.error)
    },
    removeTodoRequested(state, { payload }: PayloadAction<{ _id: string }>): void {
      state.asyncStatus.remove[payload._id] = asyncStatusRequested
    },
    removeTodoSucceeded(state, { payload }) {
      state.todos = state.todos.filter(x => x._id !== payload._id)
      state.asyncStatus.remove[payload._id] = asyncStatusSuccess
    },
    removeTodoFailed(state, { payload }) {
      state.asyncStatus.remove[payload._id] = asyncStatusFail(payload.error)
    },
    toggleTodoRequested(state, { payload }: PayloadAction<{ _id: string; isDone: boolean }>): void {
      const todo = state.todos.find(x => x._id === payload._id)
      todo.isDone = payload.isDone
      state.asyncStatus.toggle[payload._id] = asyncStatusRequested
    },
    toggleTodoSucceeded(state, { payload }) {
      state.asyncStatus.toggle[payload._id] = asyncStatusSuccess
    },
    toggleTodoFailed(state, { payload }) {
      state.asyncStatus.toggle[payload._id] = asyncStatusFail(payload.error)
    },
    // getTodosRequested(state) {
    //   state.asyncStatus.getAll = asyncStatusRequested
    // },
    // getTodosSucceeded(state, { payload }: PayloadAction<Todo[]>) {
    //   state.todos = payload
    //   state.asyncStatus.getAll = asyncStatusSuccess
    // },
    // getTodosFailed(state, { payload }) {
    //   state.asyncStatus.getAll = asyncStatusFail(payload.error)
    // },
  },
})
