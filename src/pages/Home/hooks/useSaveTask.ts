import { useMutation, useQueryCache } from "react-query";
import { saveTask } from "../../../api";
import { IAllTasksByDay, actions, SavedTask } from "../../../reducers/calendar";
import { useAppDispatch } from "../../../Application/Root";

export function useSaveTask() {
  const queryCache = useQueryCache();
  const dispatch = useAppDispatch();
  
  return useMutation(saveTask, {
    onMutate: updatedTask => {
      queryCache.cancelQueries("tasks");
      const previousTasks = queryCache.getQueryData("tasks");
      queryCache.setQueryData("tasks", (oldTasks: IAllTasksByDay) => {
        const updatedTasks = { ...oldTasks };
        const { _id, timestamp } = updatedTask;
        const task: SavedTask = oldTasks[timestamp].tasks.find(x => x._id === _id);
        for (const x in task) {
          task[x] = updatedTask[x];
        }
        return updatedTasks;
      });

      return () => queryCache.setQueryData("tasks", previousTasks);
    },
    onError: (err, newTodo, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries("tasks");
      dispatch({ type: actions.removeEditedTask.toString() });
    },
  });
}
