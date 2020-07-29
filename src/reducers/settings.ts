import { createSlice, nanoid } from '@reduxjs/toolkit'

export interface IGroup {
  id: string
  name: string
  colorId: string
}

interface IInitialState {
  [key: string]: any
  defaultHoursFrom: number
  defaultHoursTo: number
  colors: {
    [key: string]: string
  }
  groups: IGroup[]
}

const initialState: IInitialState = {
  defaultHoursFrom: 6,
  defaultHoursTo: 23,
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
  groups: [
    {
      id: nanoid(),
      name: 'essentials',
      colorId: 'aero_blue',
    },
    {
      id: nanoid(),
      name: 'work',
      colorId: 'blanched_almond',
    },
    {
      id: nanoid(),
      name: 'improvement',
      colorId: 'mimi_pink',
    },
    {
      id: nanoid(),
      name: 'leasure',
      colorId: 'beau_blue',
    },
    {
      id: nanoid(),
      name: 'productivity break',
      colorId: 'aero_blue_2',
    },
    {
      id: nanoid(),
      name: 'health',
      colorId: 'teagreen',
    },
    {
      id: nanoid(),
      name: 'laze',
      colorId: 'light_cyan',
    },
    {
      id: nanoid(),
      name: 'planning',
      colorId: 'azure',
    },
  ],
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
  },
})
