import { useMutation, useQueryCache } from "react-query";
import { addTask } from "../../../api";
import { IAllTasksByDay, actions } from "../../../reducers/calendar";
import { useAppDispatch } from "../../../Application/Root";

export function useAddTask() {
  const queryCache = useQueryCache();
  const dispatch = useAppDispatch();

  // TODO:
  // yield put({ type: actions.sortTasks.toString(), payload });

  const [addNewTask] = useMutation(addTask, {
    onMutate: newTask => {
      queryCache.cancelQueries("tasks");
      const previousTasks = queryCache.getQueryData("tasks");
      queryCache.setQueryData("tasks", (oldTasks: IAllTasksByDay) => {
        const updatedTasks = { ...oldTasks };
        const affectedDay = updatedTasks[newTask.timestamp] || { tasks: [] };
        affectedDay.tasks.push(newTask);
        updatedTasks[newTask.timestamp] = affectedDay;

        return updatedTasks;
      });

      return () => queryCache.setQueryData("tasks", previousTasks);
    },
    onError: (err, newTask, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries("tasks");
      dispatch({ type: actions.removePreparedTask.toString() })
    },
  });

  return { addNewTask };
}
