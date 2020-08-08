import { SavedTask } from '../reducers/calendar'
import { AsyncStatus, asyncStatusInitial } from '../constants'

export const taskSort = (a: SavedTask, b: SavedTask) => a.time[0] - b.time[0]

export const determinePlaceholderHeight = ({ wrapRef, hoursAxis }: any) =>
  wrapRef.current ? (wrapRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2) : 0

export const determineAsyncStatus = (params: AsyncStatus | AsyncStatus[]) => {
  let async = { ...asyncStatusInitial }

  if (!Array.isArray(params)) {
    async = params
  } else {
    const filtered = params.filter((x: AsyncStatus) => x !== undefined)
    if (filtered.length > 0) {
      filtered.forEach(test => {
        console.log('test', test)
        const { isInitial, isBusy, isDone, isError, errorMessage } = test
        async.isInitial = async.isInitial || isInitial
        async.isBusy = async.isBusy || isBusy
        async.isDone = async.isDone || isDone
        async.isError = async.isError || isError
        async.errorMessage = async.errorMessage || errorMessage
      })
    }
  }
  return async
}

export const payloadError = ({ _id, error }: { _id?: string; error: string }) => ({ _id, error })
