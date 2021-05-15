import { useGetGroups } from "./useGetGroups";
import { useGetTasks } from "./useGetTasks";

export const useHome = () => {
  const { data: groups } = useGetGroups();
  const { data: allTasksByDay = {} } = useGetTasks();
  return {
    allTasksByDay,
    groups,
  } as const;
};
