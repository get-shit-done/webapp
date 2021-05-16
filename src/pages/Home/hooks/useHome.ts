import { useGetGroupsQuery, useGetTasksQuery } from "../../../api";

export const useHome = () => {
  const { data: groups } = useGetGroupsQuery(undefined);
  const { data: allTasksByDay = {} } = useGetTasksQuery(undefined);

  return {
    allTasksByDay,
    groups,
  };
};
