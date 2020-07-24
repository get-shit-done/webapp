import { SavedTask } from "../reducers/calendar";

export const taskSort = (a: SavedTask, b: SavedTask) => a.time[0] - b.time[0]
