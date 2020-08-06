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
    removeTodoRequested(state, { payload }: PayloadAction<{ _id: string }>): void {
      state.todos = state.todos.filter(x => x._id !== payload._id)
    },
    toggleTodoRequested(state, { payload }: PayloadAction<{ _id: string }>): void {
      const todo = state.todos.find(x => x._id === payload._id)
      todo.isDone = !todo.isDone
    },
    getTodosRequested() {
      //
    },
    getTodosSucceeded(state, { payload }: PayloadAction<Todo[]>) {
      console.log(payload)
      state.todos = payload
    },
    getTodosFailed(state, action) {
      console.log(action)
    },
  },
})
