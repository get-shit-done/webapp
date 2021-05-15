import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import format from "date-fns/format";
import {
  MONTH_DAYS,
  MONTH_DAYS_STRING,
  HOURS_IN_DAY,
  asyncStatusInitial,
  AsyncStatus,
  asyncStatusRequested,
  asyncStatusSuccess,
  asyncStatusFail,
  asyncStatusRequestedInherit,
} from "../constants";
import { taskSort } from "../utils";
import { shallowEqual } from "react-redux";
import { eventChannel } from "redux-saga";

export interface TaskBeingPrepared {
  timestamp?: string;
  time?: number[];
  name?: string;
  group?: string;
}
export interface NewTask {
  [key: string]: any;
  time: number[];
  name: string;
  group: string;
  timestamp: string;
}
export interface SavedTask extends NewTask {
  _id: string;
}

export interface TaskWithMeta extends SavedTask {
  heightInFlex?: number;
  gapBefore?: number;
  gapAfter?: number;
}
export interface IAllTasksByDay {
  [key: string]: {
    tasks: SavedTask[];
  };
}
interface IInitialState {
  focusedTimestamp: string;
  taskBeingPrepared: TaskBeingPrepared;
  taskBeingEdited: TaskWithMeta | undefined;
  allTasksByDay: IAllTasksByDay;
  hoursAxis: number[];
  daysAxis: string[];
  asyncStatus: {
    getTasks: AsyncStatus;
    saveTask: AsyncStatus;
    removeTask: AsyncStatus;
    addTask: AsyncStatus;
  };
}
const initialState: IInitialState = {
  focusedTimestamp: undefined,
  taskBeingPrepared: undefined,
  taskBeingEdited: undefined,
  allTasksByDay: {},
  hoursAxis: HOURS_IN_DAY,
  daysAxis: MONTH_DAYS_STRING(),
  asyncStatus: {
    getTasks: asyncStatusInitial,
    saveTask: asyncStatusInitial,
    removeTask: asyncStatusInitial,
    addTask: asyncStatusInitial,
  },
};

export const { reducer, actions } = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    filterHours(state, { payload: { from, to } }: PayloadAction<{ from: number; to: number }>): void {
      state.hoursAxis = HOURS_IN_DAY.filter(hour => hour >= from && hour <= to);
    },
    filterDays(state, { payload: { from, to } }: PayloadAction<{ from: string | number; to: string | number }>): void {
      state.daysAxis = MONTH_DAYS()
        .filter(day => format(day, "d") >= from && format(day, "d") <= to)
        .map(day => day.toString());
    },
    resetAsyncStatus(state) {
      state.asyncStatus.removeTask = asyncStatusInitial;
      state.asyncStatus.addTask = asyncStatusInitial;
      state.asyncStatus.saveTask = asyncStatusInitial;
    },
    saveFocusedTimestamp(state, { payload }: PayloadAction<{ timestamp: string }>): void {
      state.focusedTimestamp = payload.timestamp;
    },
    prepareTask(state, { payload }: PayloadAction<TaskBeingPrepared>): void {
      state.taskBeingPrepared = payload;
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = undefined;
    },
    removeEditedTask(state) {
      state.taskBeingEdited = undefined;
    },
    editTaskPrepare(state, { payload: task }: PayloadAction<SavedTask>): void {
      state.taskBeingEdited = task;
    },
    updateEditedTask(state, { payload }: PayloadAction<SavedTask>): void {
      state.taskBeingEdited = payload
    },
    editTaskCancel(state): void {
      const { _id, timestamp } = state.taskBeingEdited;
      const task = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id);

      for (const x in task) {
        task[x] = shallowEqual(state.taskBeingEdited[x], task[x]) ? task[x] : state.taskBeingEdited[x];
      }
      state.taskBeingEdited = undefined;
    },
    // saveTaskRequested(state, action: any) {
    //   state.asyncStatus.saveTask = asyncStatusRequestedInherit(state.asyncStatus.saveTask);
    // },
    // saveTaskSuccess(state, { payload }: PayloadAction<SavedTask>): void {
    //   const { _id, timestamp } = payload;
    //   const task: SavedTask = state.allTasksByDay[timestamp].tasks.find(x => x._id === _id);
    //   for (const x in task) {
    //     task[x] = payload[x];
    //   }
    //   state.taskBeingEdited = undefined;
    //   state.asyncStatus.saveTask = asyncStatusSuccess;
    // },
    // saveTaskFailed(state, { payload }: PayloadAction<{ error: string }>) {
    //   state.asyncStatus.saveTask = asyncStatusFail(payload.error);
    // },
    // addTaskRequested(state, action: PayloadAction<NewTask>): void {
    //   state.asyncStatus.addTask = asyncStatusRequestedInherit(state.asyncStatus.addTask);
    // },
    // addTaskSuccess(state, { payload }: PayloadAction<SavedTask>): void {
    //   const affectedDay = state.allTasksByDay[payload.timestamp] || { tasks: [] };
    //   affectedDay.tasks.push(payload);
    //   state.allTasksByDay[payload.timestamp] = affectedDay;

    //   state.taskBeingEdited = undefined;
    //   state.asyncStatus.addTask = asyncStatusSuccess;
    // },
    // addTaskFailed(state, { payload }: PayloadAction<{ error: string }>) {
    //   state.asyncStatus.addTask = asyncStatusFail(payload.error);
    // },
    // getTasksRequested(state, { payload }: PayloadAction<{ date: Date }>) {
    //   state.asyncStatus.getTasks = asyncStatusRequested;
    // },
    // getTasksSuccess(state, { payload: { response, date } }: PayloadAction<{ response: IAllTasksByDay; date: Date }>) {
    //   state.allTasksByDay = response;
    //   state.asyncStatus.getTasks = asyncStatusSuccess;
    //   state.daysAxis = MONTH_DAYS_STRING(date);
    // },
    // getTasksFail(state, { payload }: PayloadAction<{ error: string }>) {
    //   state.asyncStatus.getTasks = asyncStatusFail(payload.error);
    // },
    removeTaskRequested(state, action): void {
      state.asyncStatus.removeTask = asyncStatusRequestedInherit(state.asyncStatus.removeTask);
    },
    removeTaskSucceeded(state, { payload: { _id, timestamp } }: PayloadAction<SavedTask>) {
      state.allTasksByDay[timestamp].tasks = state.allTasksByDay[timestamp].tasks.filter(x => x._id !== _id);
      state.taskBeingEdited = undefined;
      state.asyncStatus.removeTask = asyncStatusSuccess;
    },
    removeTaskFailed(state, { payload }: PayloadAction<{ error: string }>) {
      state.asyncStatus.removeTask = asyncStatusFail(payload.error);
    },
    sortTasks(state, { payload: { timestamp } }): void {
      state.allTasksByDay[timestamp].tasks.sort(taskSort);
    },
  },
});
