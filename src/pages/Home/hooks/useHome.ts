import { useGetGroups } from "./useGetGroups";
import { useGetGroupsQuery, useGetTasksQuery } from "../../../api";
import { useGetTasks } from "./useGetTasks";

export const useHome = () => {
  const { data: groups } = useGetGroupsQuery(undefined);
  const { data: allTasksByDay = {} } = useGetTasksQuery(undefined);

  return {
    allTasksByDay,
    groups,
  };
};
