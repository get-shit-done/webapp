import { format } from "date-fns";
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";
import { actions } from "../reducers/calendar";

import { actions as toastActions } from "../components/Toast/reducer";

const URL = "http://localhost:3005/api/v1";

export const API_TASKS = `${URL}/tasks`;
export const API_TASKS_BY_ID = (id: string) => `${URL}/tasks/${id}`;

export const API_GROUPS = `${URL}/groups`;
export const API_GROUPS_BY_ID = (id: string) => `${URL}/groups/${id}`;

export const API_TODOS = `${URL}/todos`;
export const API_TODOS_BY_ID = (id: string) => `${URL}/todos/${id}`;

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: builder => ({
    getTasks: builder.query({
      query: (monthOfTasks?: Date) => `${API_TASKS}?month=Jun`,
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
        // dispatch({ type: actions.sortTasks.toString() });
      },
      onSuccess: (payload: any, { dispatch, context }, response) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTasks", undefined, draft => {
            draft[payload.timestamp].tasks.find(task => !task._id)._id = response.data._id;
          })
        ).inversePatches;
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
    removeTask: builder.mutation({
      query: (payload: any) => ({ url: API_TASKS_BY_ID(payload._id), method: "DELETE" }),
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTasks", undefined, draft => {
            const { _id, timestamp } = payload;
            draft[timestamp].tasks = draft[timestamp].tasks.filter((x: any) => x._id !== _id);
          })
        ).inversePatches;
        dispatch({ type: actions.removeEditedTask.toString() });
        // dispatch({ type: actions.sortTasks.toString() });
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
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getGroups", undefined, draft => {
            const groupToUpdate = draft.find((x: any) => x._id === payload.groupId);
            groupToUpdate.colorId = payload.colorId;
          })
        ).inversePatches;
      },
    }),
    removeGroup: builder.mutation({
      query: ({ _id }: { _id: string }) => ({ url: API_GROUPS_BY_ID(_id), method: "DELETE" }),
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getGroups", undefined, draft => {
            return draft.filter((x: any) => x._id !== payload._id);
          })
        );
      },
    }),
    getTodos: builder.query({
      query: () => API_TODOS,
      transformResponse: (response: any) => response.data,
    }),
    updateTodo: builder.mutation({
      query: ({ _id, isDone }: { _id: string; isDone: boolean }) => ({
        url: API_TODOS_BY_ID(_id),
        body: { _id, isDone },
        method: "PATCH",
      }),
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTodos", undefined, draft => {
            const todoIndexToUpdate = draft.findIndex((x: any) => x._id === payload._id);
            draft[todoIndexToUpdate].isDone = payload.isDone;
          })
        );
      },
    }),
    removeTodo: builder.mutation({
      query: ({ _id }: { _id: string }) => ({ url: API_TODOS_BY_ID(_id), method: "DELETE" }),
      onSuccess: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTodos", undefined, draft => {
            return draft.filter((x: any) => x._id !== payload._id);
          })
        ).inversePatches;
        dispatch(toastActions.addToast({ prefix: "task removed", message: payload.todoName }));
      },
    }),
    addTodo: builder.mutation({
      query: (payload: { todoName: string }) => ({ url: API_TODOS, body: payload, method: "POST" }),
      onStart: (payload: any, { dispatch, context }) => {
        context.undoPost = dispatch(
          tasksApi.util.updateQueryResult("getTodos", undefined, draft => {
            draft.unshift(payload);
          })
        );
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useSaveTaskMutation,
  useRemoveTaskMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
  useRemoveGroupMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useAddTodoMutation,
} = tasksApi;
