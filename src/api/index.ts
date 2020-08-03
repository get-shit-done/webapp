const URL = 'http://localhost:3005/api/v1'

export const API_TASKS = `${URL}/tasks`
export const API_TASKS_BY_ID = (id: string) => `${URL}/tasks/${id}`

export const API_GROUPS = `${URL}/groups`
export const API_GROUPS_BY_ID = (id: string) => `${URL}/groups/${id}`
