import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string,
  todoName: string,
  isDone: boolean
}

const initialState = {
  groups: [
    {
      groupName: 'development',
      id: nanoid(),
    },
    {
      groupName: 'career',
      id: nanoid(),
    },
    {
      groupName: 'health',
      id: nanoid(),
    },
  ],
  todos: [
    {
      id: nanoid(),
      todoName: 'finish this todo',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'add an input to add new todos',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'add validation to input',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'add toast for removing todos',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'add conditional styling for isDone',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'add grouping',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'finalise resume',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'complete courses',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'stretch',
      isDone: false,
    },
    {
      id: nanoid(),
      todoName: 'make Mai a kickass meal',
      isDone: false,
    },
  ]
}

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    add({ todos }, action: PayloadAction<Todo>) { todos.push({
      id: nanoid(),
      isDone: false,
      todoName: action.payload.todoName,
    }) },
    remove(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(x => x.id !== action.payload)
    },
    toggleIsDone: ({ todos }, action: PayloadAction<string>) => {
      const todo = todos.find(x => x.id === action.payload)
      todo.isDone = !todo.isDone
    },
    apiGet() {
      //
    },
    apiSuccess(state, action) {
      console.log(action)
    },
    apiFail(state, action) {
      console.log(action)
    }
  },
})
