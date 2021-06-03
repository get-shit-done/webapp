import getDaysInMonth from "date-fns/getDaysInMonth";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import sub from "date-fns/sub";
import { FetchBaseQueryError } from "@rtk-incubator/rtk-query/dist";
import { SerializedError } from "@reduxjs/toolkit";

export const HOURS_IN_DAY = Array(24)
  .fill(null)
  .map((item, index) => index);
export const MONTH_DAYS = (date: Date = new Date()) =>
  eachDayOfInterval({
    start: sub(lastDayOfMonth(date), { days: getDaysInMonth(date) - 1 }),
    end: lastDayOfMonth(date),
  });
export const MONTH_DAYS_STRING = (date: Date = new Date()) => MONTH_DAYS(date).map(date => date.toString());

export interface AsyncStatusNew {
  isUninitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error?: FetchBaseQueryError | SerializedError;
}
