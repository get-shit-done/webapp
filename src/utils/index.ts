import { SavedTask } from '../reducers/calendar'
import { AsyncStatus } from '../constants'

export const taskSort = (a: SavedTask, b: SavedTask) => a.time[0] - b.time[0]

export const determinePlaceholderHeight = ({ wrapRef, hoursAxis }: any) =>
  wrapRef.current ? (wrapRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2) : 0

export const determineAsyncStatus = (params: AsyncStatus | AsyncStatus[]) => {
  if (!Array.isArray(params)) {
    return params
  }
  const filtered = params.filter((x: AsyncStatus) => x !== undefined)
  return {
    isInitial: !filtered.every(x => !x.isInitial),
    isBusy: !filtered.every(x => !x.isBusy),
    isDone: !filtered.every(x => !x.isDone),
    isError: !filtered.every(x => !x.isError),
  }
}
