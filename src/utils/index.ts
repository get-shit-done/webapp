import { SavedTask } from '../reducers/calendar'

export const taskSort = (a: SavedTask, b: SavedTask) => a.time[0] - b.time[0]

export const determinePlaceholderHeight = ({ wrapRef, hoursAxis }: any) =>
  wrapRef.current ? (wrapRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2) : 0
