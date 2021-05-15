import { useQuery } from "react-query";
import { getTasks } from "../../../api";
import { IAllTasksByDay } from "../../../reducers/calendar";

// TODO:
// state.daysAxis = MONTH_DAYS_STRING(date);
export function useGetTasks(dateOfTasks?: Date) {
  const { data } = useQuery<IAllTasksByDay>("tasks", getTasks);
  return { allTasksByDay: data };
}
