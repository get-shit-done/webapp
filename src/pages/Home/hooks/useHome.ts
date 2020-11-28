import { useQuery } from 'react-query'
import { getGroups } from '../../../api'
import { IGroup } from '../../../reducers/settings'

export function useGroups() {
  return useQuery<IGroup[], Error>(
    'groups',
    getGroups
  )
}

export const useHome = () => {
  console.log('usehome//???')
  const { data: groups } = useGroups()

  return {
    groups
  } as const
}
