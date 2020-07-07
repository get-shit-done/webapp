import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { number } from 'prop-types'

interface IProps {
  from: number,
  to: number,
  cb: any,
}

const UseRangeFilter = ({ from, to, cb }: IProps) => {
  const dispatch = useDispatch()
  const [{ fromDefault, toDefault }] = useState({ fromDefault: from, toDefault: to })
  const [{ fromCustom, toCustom }, applyFilters] = useState<any>({}) // TODO: fix this

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
