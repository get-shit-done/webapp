import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ENUM_THEMES } from '../enums'

export interface IGroup {
  _id: string
  name: string
  colorId: string
}

interface IThemeValues {
  [key: string]: any
  bg: string
  columnBorder: string
  columnHoverBg: string
  placeholderBorder: string
  axisBg: string
  axisBorder: string
  currentTimeBg: string
  currentTimeBorder: string
  currentTimeColor: string
}

interface ITheme {
  [key: string]: IThemeValues
}

interface IInitialState {
  [key: string]: any
  defaultHoursFrom: number
  defaultHoursTo: number
  themeName: string
  themeValues: ITheme
  colors: {
    [key: string]: string
  }
  groups: IGroup[]
}

const themes: ITheme = {
  [ENUM_THEMES.light]: {
    bg: '#fff',
    columnBorder: 'var(--isabelline)',
    columnHoverBg: '#fefcff',
    placeholderBorder: '#3d4150',
    axisBg: 'var(--jet)',
    axisBorder: '#ffffff42',
    currentTimeBg: 'var(--jet)',
    currentTimeBorder: 'var(--jet)',
    currentTimeColor: 'var(--white-smoke)',
  },
  [ENUM_THEMES.dark]: {
    bg: '#2a2a2a',
    columnBorder: '#3c3b3b',
    columnHoverBg: '#333',
    placeholderBorder: '#fff',
    axisBg: '#222',
    axisBorder: '#3c3b3b',
    currentTimeBg: '#fff',
    currentTimeBorder: '#222',
    currentTimeColor: '#222',
  },
}

const initialState: IInitialState = {
  defaultHoursFrom: 6,
  defaultHoursTo: 23,
  themeName: ENUM_THEMES.light,
  themeValues: themes[ENUM_THEMES.light],
  colors: {
    aero_blue: 'rgb(216, 255, 230)',
    papaya_whip: 'rgb(255, 236, 210)',
    blanched_almond: 'rgb(251, 231, 198)',
    powder_blue: 'rgb(198, 242, 244)',
    misty_rose: 'rgb(255, 232, 229)',
    mimi_pink: 'rgb(255, 212, 219)',
    blanched_almond_2: 'rgb(251, 229, 200)',
    aero_blue_2: 'rgb(202, 248, 236)',
    beige_2: 'rgb(239, 241, 219)',
    pale_purple_pantone: 'rgb(243, 223, 255)',
    columbia_blue: 'rgb(215, 241, 255)',
    celeste: 'rgb(198, 248, 241)',
    light_cyan_2: 'rgb(211, 233, 236)',
    alice_blue: 'rgb(224, 243, 255)',
    light_cyan: 'rgb(202, 247, 255)',
    lemon_merigue_2: 'rgb(242, 232, 192)',
    seashell: 'rgb(255, 243, 235)',
    tea_green: 'rgb(199, 229, 199)',
    pale_purple_2: 'rgb(255, 240, 255)',
    periwinkle: 'rgb(210, 221, 255)',
    deep_champagne: 'rgb(255, 213, 154)',
    light_goldenrod_yellow: 'rgb(249, 255, 213)',
    honeydrew: 'rgb(242, 255, 230)',
    azure: 'rgb(242, 255, 255)',
    maximum_blue_purple: 'rgb(179, 187, 233)',
    lemon_meringue: 'rgb(250, 236, 198)',
    beige: 'rgb(226, 236, 213)',
    beau_blue: 'rgb(193, 206, 212)',
  },
  groups: [],
}

export const { reducer, actions } = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state, { payload }: any): void {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value
      })
    },
    activateTheme(state, { payload: { theme } }: PayloadAction<{ theme: string }>): void {
      state.themeValues = themes[theme]
      state.themeName = theme
    },
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
