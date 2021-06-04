import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import format from "date-fns/format";
import { MONTH_DAYS, MONTH_DAYS_STRING, HOURS_IN_DAY } from "../constants";
import { taskSort } from "../utils";
import { shallowEqual } from "react-redux";

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
  taskBeingEdited?: TaskWithMeta;
  taskBeingEditedClone?: TaskWithMeta;
  allTasksByDay: IAllTasksByDay;
  hoursAxis: number[];
  daysAxis: string[];
}
const initialState: IInitialState = {
  focusedTimestamp: undefined,
  taskBeingPrepared: undefined,
  taskBeingEdited: undefined,
  taskBeingEditedClone: undefined,
  allTasksByDay: {},
  hoursAxis: HOURS_IN_DAY,
  daysAxis: MONTH_DAYS_STRING(),
};

export const { reducer, actions } = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    filterHours(state, { payload: { from, to } }: PayloadAction<{ from: number; to: number }>) {
      state.hoursAxis = HOURS_IN_DAY.filter(hour => hour >= from && hour <= to);
    },
    filterDays(state, { payload: { from, to } }: PayloadAction<{ from: string | number; to: string | number }>) {
      state.daysAxis = MONTH_DAYS()
        .filter(day => format(day, "d") >= from && format(day, "d") <= to)
        .map(day => day.toString());
    },
    saveFocusedTimestamp(state, { payload }: PayloadAction<{ timestamp: string }>) {
      state.focusedTimestamp = payload.timestamp;
    },
    prepareTask(state, { payload }: PayloadAction<TaskBeingPrepared>) {
      state.taskBeingPrepared = payload;
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = undefined;
    },
    removeEditedTask(state) {
      state.taskBeingEdited = undefined;
    },
    editTaskPrepare(state, { payload: task }: PayloadAction<SavedTask>) {
      state.taskBeingEdited = task;
      state.taskBeingEditedClone = task;
    },
    updateEditedTask(state, { payload }: PayloadAction<SavedTask>) {
      state.taskBeingEdited = payload;
    },
    editTaskCancel(state) {
      state.taskBeingEdited = undefined;
    },
    sortTasks(state, { payload: { timestamp } }) {
      state.allTasksByDay[timestamp].tasks.sort(taskSort);
    },
  },
});
