import { useState } from 'react'
import { useAppDispatch } from '../Application/Root'
import { AnyAction } from '@reduxjs/toolkit'

interface IProps {
  from: number,
  to: number,
  cb({}: { from: number, to: number }): AnyAction,
}
interface Filters {
  fromCustom?: number,
  toCustom?: number,
}

const UseRangeFilter = ({ from, to, cb }: IProps) => {
  const dispatch = useAppDispatch()
  const [{ fromDefault, toDefault }] = useState({ fromDefault: from, toDefault: to })
  const [{ fromCustom, toCustom }, applyFilters] = useState<Filters>({})

  const onFilter = (hour: number) => {
    if (!fromCustom) {
      applyFilters({ fromCustom: hour })
    } else if (!toCustom){
      applyFilters({ toCustom: hour, fromCustom })
      dispatch(cb({ from: Math.min(fromCustom, hour), to: Math.max(fromCustom, hour) }))
    }

    if (fromCustom !== undefined && toCustom !== undefined) {
      applyFilters({})
      dispatch(cb({ from: fromDefault, to: toDefault }))
    }
  }

  return [
    {
      isFiltered: fromCustom !== undefined && toCustom !== undefined,
      isBeingFiltered: fromCustom !== undefined && toCustom === undefined,
      from: fromCustom || fromDefault,
      to: toCustom || toDefault,
    },
    onFilter,
  ] as const
}

export default UseRangeFilter
