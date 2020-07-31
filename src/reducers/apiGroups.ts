import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IGroup {
  _id: string
  name: string
  colorId: string
}
interface IInitialState {
  groups: IGroup[]
}

const initialState: IInitialState = {
  groups: [],
}

export const { reducer, actions } = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getGroupsRequested(): void {},
    getGroupsSucceeded(state, { payload }: PayloadAction<IGroup[]>): void {
      // console.log('grt groups succeded', payload)
      state.groups = payload
    },
    getGroupsFailed() {
      console.log('failed to get groups')
    },
    updateGroupRequested(
      state,
      { payload: { groupId, colorId } }: PayloadAction<{ groupId: string; colorId: string }>,
    ): void {
      const groupToUpdate = state.groups.find(x => x._id === groupId)
      groupToUpdate.colorId = colorId
    },
    updateGroupSucceeded(): void {},
    updateGroupFailed(): void {},
    removeGroup(state, { payload: { _id } }: PayloadAction<{ _id: string }>): void {
      state.groups = state.groups.filter(x => x._id !== _id)
    },
  },
})
