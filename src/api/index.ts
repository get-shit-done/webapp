const URL = 'http://localhost:3005/api/v1'

export const API_GET_TASKS = `${URL}/tasks`
export const API_SAVE_TASK = (id: string) => `${URL}/tasks/${id}`
