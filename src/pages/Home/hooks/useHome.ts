import { useMutation, useQuery, useQueryCache } from 'react-query'
import { getTasks, getGroups, removeGroup, updateGroup, addTask } from '../../../api'
import { IGroup } from '../../../reducers/settings'
import { IAllTasksByDay } from '../../../reducers/calendar'

// tasks
export function useGetTasks() {
  console.log('get tasks')
  return useQuery<IAllTasksByDay, Error>(
    'tasks',
    getTasks
  )
}

export function useAddTask() {
  const queryCache = useQueryCache()

  // TODO:
  // yield put({ type: actions.removePreparedTask.toString() });
  // yield put({ type: actions.addTaskSuccess.toString(), payload: response.data.data });
  // yield put({ type: actions.sortTasks.toString(), payload });

  //   state.taskBeingEdited = undefined;
  return useMutation(addTask, {
    onMutate: newTask => {
      queryCache.cancelQueries('tasks')
      const previousTasks = queryCache.getQueryData('tasks')
      queryCache.setQueryData('tasks', (oldTasks: IAllTasksByDay) => {
        const test = { ...oldTasks }
        const affectedDay = test[newTask.timestamp] || { tasks: [] };
        affectedDay.tasks.push(newTask);
        test[newTask.timestamp] = affectedDay;

        return test
      })
  
      return () => queryCache.setQueryData('tasks', previousTasks)
    },
    onError: (err, newTask, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries('tasks')
    },
  })
}

// groups
export function useGroups() {
  return useQuery<IGroup[], Error>(
    'groups',
    getGroups
  )
}

export function useUpdateGroup() {
  const queryCache = useQueryCache()

  return useMutation(updateGroup, {
    onMutate: group => {
      queryCache.cancelQueries('groups')
      const previousGroups = queryCache.getQueryData('groups')
      queryCache.setQueryData('groups', (oldQuery: IGroup[]) => oldQuery.map(query => {
        if (query._id !== group.groupId) return query
        return {
          ...query,
          ...group,
        }
      }))
  
      return () => queryCache.setQueryData('groups', previousGroups)
    },
    onError: (err, group, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries('groups')
    },
  })
}

export function useRemoveGroup() {
  const queryCache = useQueryCache()

  return useMutation(removeGroup, {
    onMutate: group => {
      queryCache.cancelQueries('groups')
      const previousGroups = queryCache.getQueryData('groups')
      queryCache.setQueryData('groups', (oldQuery: IGroup[]) => oldQuery.filter(x => x._id !== group._id))
  
      return () => queryCache.setQueryData('groups', previousGroups)
    },
    onError: (err, group, rollback: () => void) => rollback(),
    onSettled: () => {
      queryCache.invalidateQueries('groups')
    },
  })
}


// HOME
export const useHome = () => {
  const { data: groups } = useGroups()
  const { data: allTasksByDay = {} } = useGetTasks()
  return {
    allTasksByDay,
    groups
  } as const
}
