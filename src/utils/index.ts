import { SavedTask } from "../reducers/calendar";
import { AsyncStatus, asyncStatusInitial } from "../constants";
import { FetchBaseQueryError } from "@rtk-incubator/rtk-query/dist";
import { SerializedError } from "@reduxjs/toolkit";

export const taskSort = (a: SavedTask, b: SavedTask) => a.time[0] - b.time[0];

export const determinePlaceholderHeight = ({ wrapRef, hoursAxis }: any) =>
  wrapRef.current ? (wrapRef.current.getBoundingClientRect().height - 24) / (hoursAxis.length * 2) : 0;

export const determineAsyncStatus = (params?: AsyncStatus | AsyncStatus[]) => {
  if (!params) return asyncStatusInitial;
  let async = { ...asyncStatusInitial };

  if (!Array.isArray(params)) {
    async = params;
  } else {
    const filtered = params.filter((x: AsyncStatus) => x !== undefined);
    if (filtered.length > 0) {
      filtered.forEach(test => {
        // console.log('test', test)
        const { isInitial, isBusy, isDone, isError, errorMessage } = test;
        async.isInitial = async.isInitial || isInitial;
        async.isBusy = async.isBusy || isBusy;
        async.isDone = async.isDone || isDone;
        async.isError = async.isError || isError;
        async.errorMessage = async.errorMessage || errorMessage;
      });
    }
  }
  return async;
};

export const payloadError = ({ _id, error }: { _id?: string; error: string }) => ({ _id, error });

export function getAsyncStatus(
  queries: { originalArgs?: any; isLoading: boolean; isError: boolean; error?: FetchBaseQueryError | SerializedError }[]
) {
  const ids = queries.map(x => x.originalArgs?._id).filter(x => x);
  const isLoading = queries.some(x => x.isLoading);
  const isError = queries.some(x => x.isError);
  const error = queries.find(x => x.error || {}).error;

  // TODO: convert to hook, save below id to state [0] if it exists in above array
  return {
    getIsLoading: (_id: string) => ids[0] === _id && isLoading,
    getIsError: (_id: string) => ids[0] === _id && isError,
    getError: (_id: string) => (ids[0] === _id && error ? error : undefined),
  };
}
