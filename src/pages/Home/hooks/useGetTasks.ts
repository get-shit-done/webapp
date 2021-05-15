import { useQuery } from "react-query";
import { getTasks } from "../../../api";
import { IAllTasksByDay } from "../../../reducers/calendar";

export function useGetTasks() {
  return useQuery<IAllTasksByDay>("tasks", getTasks);
}
