import axios from "axios";
import { format } from "date-fns";

import { useAppDispatch } from "../Application/Root";

const URL = "http://localhost:3005/api/v1";

export const API_TASKS = `${URL}/tasks`;
export const API_TASKS_BY_ID = (id: string) => `${URL}/tasks/${id}`;

export const API_GROUPS = `${URL}/groups`;
export const API_GROUPS_BY_ID = (id: string) => `${URL}/groups/${id}`;

export const API_TODOS = `${URL}/todos`;
export const API_TODOS_BY_ID = (id: string) => `${URL}/todos/${id}`;

// tasks
export const getTasks = (dateOfTasks?: Date) => {
  // const formattedMonth = format(dateOfTasks || new Date(), "MMM");
  const formattedMonth = "May";
  // console.log(formattedMonth)
  return axios.get(`${API_TASKS}?month=${formattedMonth}`).then(res => res.data.data);
};
export const addTask = (payload: any) => {
  return axios.post(API_TASKS, payload);
};
export const saveTask = (payload: any) => axios.patch(API_TASKS_BY_ID(payload._id), payload);

// groups
export const getGroups = () => axios.get(API_GROUPS).then(res => res.data.data);
export const updateGroup = ({ groupId, colorId }: { groupId: string; colorId: string }) =>
  axios.patch(API_GROUPS_BY_ID(groupId), { colorId });
export const removeGroup = ({ _id }: { _id: string }) => axios.delete(API_GROUPS_BY_ID(_id));

// todos
export const getTodos = () => axios.get(API_TODOS).then(res => res.data.data);
export const updateTodo = ({ _id, isDone }: { _id: string; isDone: boolean }) =>
  axios.patch(API_TODOS_BY_ID(_id), { _id, isDone });
export const removeTodo = ({ _id }: { _id: string }) => axios.delete(API_TODOS_BY_ID(_id));
export const addTodo = (payload: { todoName: string }) => axios.post(API_TODOS, payload);

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";
import { actions } from "../reducers/calendar";

// const dispatch = useAppDispatch();

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/api/v1" }),
  endpoints: builder => ({
    getTasks: builder.query({
      query: (monthOfTasks?: Date) => `${API_TASKS}?month=May`,
      transformResponse: (response: any) => response.data,
    }),
    addTask: builder.mutation({
      query: (payload: any) => ({ url: API_TASKS, body: payload, method: "POST" }),
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTasks", undefined, draft => {
            const affectedDay = draft[payload.timestamp] || { tasks: [] };
            affectedDay.tasks.push(payload);
            draft[payload.timestamp] = affectedDay;
          })
        ).inversePatches;
        dispatch({ type: actions.removePreparedTask.toString() });
        dispatch({ type: actions.sortTasks.toString() });
      },
    }),
    saveTask: builder.mutation({
      query: (payload: any) => ({ url: API_TASKS_BY_ID(payload._id), method: "PATCH", body: payload }),
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTasks", undefined, draft => {
            const { _id, timestamp } = payload;
            const task = draft[timestamp].tasks.find((x: any) => x._id === _id);
            for (const x in task) {
              task[x] = payload[x];
            }
          })
        ).inversePatches;
        dispatch({ type: actions.removeEditedTask.toString() });
      },
    }),
    getGroups: builder.query({
      query: () => API_GROUPS,
      transformResponse: (response: any) => response.data,
    }),
    updateGroup: builder.mutation({
      query: ({ groupId, colorId }: { groupId: string; colorId: string }) => ({
        url: API_GROUPS_BY_ID(groupId),
        body: { colorId },
        method: "PATCH",
      }),
    }),
    removeGroup: builder.mutation({
      query: ({ _id }: { _id: string }) => ({ url: API_GROUPS_BY_ID(_id), method: "DELETE" }),
    }),
    getTodos: builder.query({
      query: () => API_GROUPS,
      transformResponse: (response: any) => response.data,
    }),
    updateTodo: builder.mutation({
      query: ({ _id, isDone }: { _id: string; isDone: boolean }) => ({
        url: API_TODOS_BY_ID(_id),
        body: { _id, isDone },
        method: "PATCH",
      }),
    }),
    removeTodo: builder.mutation({
      query: ({ _id }: { _id: string }) => ({ url: API_TODOS_BY_ID(_id), method: "DELETE" }),
    }),
    addTodo: builder.mutation({
      query: (payload: { todoName: string }) => ({ url: API_TODOS, body: payload, method: "POST" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useSaveTaskMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
  useRemoveGroupMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useAddTodoMutation,
} = tasksApi;
