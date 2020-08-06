import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewTodo {
  todoName: string
}
export interface Todo extends NewTodo {
  _id: string
  isDone: boolean
}
interface IInitialState {
  todos: Todo[]
}
export interface IActionRemove {
  _id: string
}

const initialState: IInitialState = {
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
    removeTodoRequested(state, { payload }: PayloadAction<IActionRemove>): void {
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
    },
    toggleTodoSucceeded(state, { payload }) {
      console.log('toggle todo succeded')
    },
    toggleTodoFailed(state, { payload }) {
      console.log('toggle todo failed')
    },
    getTodosRequested() {
      //
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
