import getDaysInMonth from 'date-fns/getDaysInMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import sub from 'date-fns/sub'

export const HOURS_IN_DAY = Array(24)
  .fill(null)
  .map((item, index) => index)
export const MONTH_DAYS = eachDayOfInterval({
  start: sub(lastDayOfMonth(new Date()), { days: getDaysInMonth(new Date()) - 1 }),
  end: lastDayOfMonth(new Date()),
})
export const MONTH_DAYS_STRING = MONTH_DAYS.map(date => date.toString())

export interface AsyncStatus {
  isInitial: boolean
  isBusy: boolean
  isDone: boolean
  isError: boolean
  errorMessage?: string
}

export const asyncStatusInitial: AsyncStatus = {
  isInitial: true,
  isBusy: false,
  isDone: false,
  isError: false,
}
export const asyncStatusRequested = {
  isInitial: false,
  isBusy: true,
  isDone: false,
  isError: false,
}
export const asyncStatusRequestedInherit = ({ isError, errorMessage }: AsyncStatus) => ({
  isInitial: false,
  isBusy: true,
  isDone: false,
  isError,
  errorMessage,
})
export const asyncStatusSuccess = {
  isInitial: false,
  isBusy: false,
  isDone: true,
  isError: false,
}
export const asyncStatusFail = (errorMessage: string) => ({
  isInitial: false,
  isBusy: false,
  isDone: false,
  isError: true,
  errorMessage,
})
