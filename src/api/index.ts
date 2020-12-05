import axios from "axios"
import { format } from "date-fns"

const URL = 'http://localhost:3005/api/v1'

export const API_TASKS = `${URL}/tasks`
export const API_TASKS_BY_ID = (id: string) => `${URL}/tasks/${id}`

export const API_GROUPS = `${URL}/groups`
export const API_GROUPS_BY_ID = (id: string) => `${URL}/groups/${id}`

export const API_TODOS = `${URL}/todos`
export const API_TODOS_BY_ID = (id: string) => `${URL}/todos/${id}`

// tasks
export const getTasks = () => {
  // const formattedMonth = format(date, "MMM");
  const formattedMonth = 'Dec'
  console.log(formattedMonth)
  return axios.get(`${API_TASKS}?month=${formattedMonth}`).then(res => res.data.data)
}
export const addTask = (payload: any) => axios.post(API_TASKS, payload)

// groups
export const getGroups = () => axios.get(API_GROUPS).then(res => res.data.data)
export const updateGroup = ({ groupId, colorId }: { groupId: string, colorId: string }) => axios.patch(API_GROUPS_BY_ID(groupId), { colorId })
export const removeGroup = ({ _id }: { _id: string }) => axios.delete(API_GROUPS_BY_ID(_id))

// todos
export const getTodos = () => axios.get(API_TODOS).then(res => res.data.data)
export const updateTodo = ({ _id, isDone }: { _id: string, isDone: boolean }) => axios.patch(API_TODOS_BY_ID(_id), { _id, isDone })
export const removeTodo = ({ _id }: { _id: string }) => axios.delete(API_TODOS_BY_ID(_id))
export const addTodo = (payload: { todoName: string }) => axios.post(API_TODOS, payload)

// axios.post, API_TODOS, payload
