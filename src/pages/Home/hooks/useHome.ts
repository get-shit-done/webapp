import { useMutation, useQuery, useQueryCache } from 'react-query'
import { getGroups, updateGroup } from '../../../api'
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
      console.log('GROUP GOUP', group)
      queryCache.cancelQueries('groups')
      const previousGroups = queryCache.getQueryData('groups')
      queryCache.setQueryData('groups', (oldQuery: IGroup[]) => oldQuery.map(query => {
        if (query._id !== group.groupId) return query
        console.log('FOUND IT', group.groupId, group.colorId)
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

export const useHome = () => {
  console.log('usehome//???')
  const { data: groups } = useGroups()

  return {
    groups
  } as const
}
