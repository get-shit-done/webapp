import { useMutation, useQuery, useQueryCache } from 'react-query'
import { getGroups, removeGroup, updateGroup } from '../../../api'
import { IGroup } from '../../../reducers/settings'

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

export const useHome = () => {
  const { data: groups } = useGroups()

  return {
    groups
  } as const
}
