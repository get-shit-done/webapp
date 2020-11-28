export interface NewTodo {
  todoName: string
}
export interface Todo extends NewTodo {
  _id: string
  isDone: boolean
}
