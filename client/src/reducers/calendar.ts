import { createSlice, nanoid } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import { MONTH_DAYS, MONTH_DAYS_STRING, HOURS_IN_DAY } from '../constants'

interface Task {
  id: string,
  time: number[],
  name: string,
  group: string
}
interface IInitialState {
  taskBeingPrepared: any,
  taskBeingEdited: any,
  allTasksByDay: { tasks: Task[],
  dateString: string }[],
  hoursAxis: number[],
  daysAxis: string[],
}
const initialState: IInitialState = {
  taskBeingPrepared: undefined,
  taskBeingEdited: {},
  allTasksByDay: MONTH_DAYS_STRING.map((dateString, index) => {
    let tasks: Task[] = []
    // if (index === 0) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.25],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.25, 8.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 11.25],
    //       name: 'dev: get shit together',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.25, 12],
    //       name: 'break',
    //       group: 'productivity break',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 12.5],
    //       name: 'dev: get shit together',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 14],
    //       name: 'dev/lunch',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 14.5],
    //       name: 'shower',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 18.5],
    //       name: 'dev: get shit together',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.5, 19],
    //       name: 'break',
    //       group: 'productivity break',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 20.25],
    //       name: 'dev: get shit together',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20.25, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 1) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.5, 7],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 7.75],
    //       name: 'in bed watch react talk',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.45, 8.75],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.75, 9.5],
    //       name: 'head out with mai',
    //       group: 'health',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 12.5],
    //       name: 'watch react videos',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 14],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 15],
    //       name: 'cooking, mai',
    //       group: 'health',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 19],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 23],
    //       name: 'relax pt 1',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 2) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 8],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.5],
    //       name: 'in bed watch upskill',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 11.5],
    //       name: 'watch upskill',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.5, 12],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 22.5],
    //       name: 'relax, dev videos',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 3) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6, 7],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 13],
    //       name: 'watch upskill fp',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 14.5],
    //       name: 'make food',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 17],
    //       name: 'play pool',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17, 18.5],
    //       name: 'relax',
    //       group: 'productivity break',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.5, 20],
    //       name: 'watch upskill fp',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20, 22.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 4) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 9],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 10],
    //       name: 'reddit in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10, 11],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11, 12],
    //       name: 'youtube',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 13],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 14],
    //       name: 'lunch',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 16],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 18],
    //       name: 'shopping with mai',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 19],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 20],
    //       name: 'watch work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20, 22.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 5) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.5, 7],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 10.75],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.75, 14],
    //       name: 'lunch/find new phone',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 16],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 17.5],
    //       name: 'dishes, house cleaning',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17.5, 18],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 19],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 19.5],
    //       name: 'supper',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19.5, 21],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [21, 23.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 6) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 8],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.5],
    //       name: 'watch upskill in bed',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 11.5],
    //       name: 'morning routine/chores',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.5, 14.5],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 15],
    //       name: 'shopping',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 22.5],
    //       name: 'play with new phone/relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 7) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 8],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 9],
    //       name: 'play with phone in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 9.5],
    //       name: 'morning routine/chores',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 10.5],
    //       name: 'watch youtube',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.5, 14],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 14.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 15.75],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15.75, 16],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 18.5],
    //       name: 'watch/do work',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.5, 19],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 19.5],
    //       name: 'dev: boilerplate',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19.5, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 8) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6, 7.5],
    //       name: 'youtube in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 8.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 11.5],
    //       name: 'work/watch',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.5, 14.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 18],
    //       name: 'work/watch',
    //       group: 'improvement',
    //     },
    //   ]
    // }
    // if (index === 9) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 17.25],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17.25, 20],
    //       name: 'work/watch',
    //       group: 'improvement',
    //     },
    //   ]
    // }
    // if (index === 10) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 9.5],
    //       name: 'morning-routine/relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 17.5],
    //       name: 'work/watch',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17.5, 18],
    //       name: 'interview',
    //       group: 'work',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 19.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19.5, 20.5],
    //       name: 'interview',
    //       group: 'work',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 11) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 8],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 9],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 23],
    //       name: 'relax. off day',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 12) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.5, 9],
    //       name: 'relax in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 12],
    //       name: 'clean flat',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 13],
    //       name: 'play pool',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 16],
    //       name: 'prepare post-interview options',
    //       group: 'planning',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 18.25],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.25, 24],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 13) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 8.5],
    //       name: 'relax in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 10.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.5, 11.5],
    //       name: 'pool',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 13.5],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13.5, 14],
    //       name: 'lunch with mai',
    //       group: 'leasure',
    //     },
    //   ]
    // }
    // if (index === 17) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 9],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 9.5],
    //       name: 'relax in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 10.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.5, 11.5],
    //       name: 'breakfast eat out',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.5, 13.5],
    //       name: 'planning/admin',
    //       group: 'planning',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13.5, 15],
    //       name: 'dev: get shit done',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 18.5],
    //       name: 'ubuntu research',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 21],
    //       name: 'ubuntu setup',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [21, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 18) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 7.5],
    //       name: 'relax in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 8.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 10],
    //       name: 'play pool',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10, 10.75],
    //       name: 'walk around',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.75, 11],
    //       name: 'watch youtube',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11, 12],
    //       name: 'help guy with CV',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 15],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 15.75],
    //       name: 'break',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15.75, 16.75],
    //       name: 'emails',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16.75, 18],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 18.25],
    //       name: 'dev: boilerplate',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.25, 19.5],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19.5, 21],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [21, 21.5],
    //       name: 'courses: meditation',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [21.5, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 19) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.5, 7],
    //       name: 'relax in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 8],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.5],
    //       name: 'get to work/start',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9.5],
    //       name: 'play with ubuntu',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 12.5],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 13.5],
    //       name: 'play with ubuntu',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13.5, 15],
    //       name: 'book sapa',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 18],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 18.5],
    //       name: 'eat out',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.5, 19.25],
    //       name: 'go for a walk',
    //       group: 'health',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19.25, 20],
    //       name: 'evenint routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 21) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 8],
    //       name: 'morning routine rushed',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 13],
    //       name: 'mai was sick',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 14],
    //       name: 'lunch',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 15.25],
    //       name: 'respond to messages',
    //       group: 'health',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15.25, 18.25],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.25, 18.75],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.75, 20.5],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20.5, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 24) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.75],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.75, 8.5],
    //       name: 'morning routine rushed',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9],
    //       name: 'get to work, sit down',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 11],
    //       name: 'emails, youtube',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11, 14],
    //       name: 'course: docker (fix)',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 14.5],
    //       name: 'look for shoes',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 15],
    //       name: 'walk home',
    //       group: 'health',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 16],
    //       name: 'lunch',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 20],
    //       name: 'transfer money. buy shoes',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
    // if (index === 24) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 7.5],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 8],
    //       name: 'morning routine rushed',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.25],
    //       name: 'get to work, sit down',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 9],
    //       name: 'work start routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 10.5],
    //       name: 'course: docker',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.5, 11.5],
    //       name: 'play pool',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.5, 12.5],
    //       name: 'walk home, shower',
    //       group: 'health',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 13],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 16],
    //       name: 'clothes shopping',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 18],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 18.5],
    //       name: 'course : docker',
    //       group: 'improvement',
    //     },
    //   ]
    // }
    // if (index === 7) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 8.25],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 8.5],
    //       name: 'get to work',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9.5],
    //       name: 'work morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 12],
    //       name: 'courses - fs for fed',
    //       group: 'improvement',
    //     },
    //   ]
    // }
    // if (index === 8) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 7.25],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.25, 8],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 9],
    //       name: 'work morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 12],
    //       name: 'courses - fs for fed',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12, 12.5],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 14.5],
    //       name: 'courses - fs for fed',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 18],
    //       name: 'Hang out with Mai',
    //       group: 'leasure',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 20.5],
    //       name: 'courses - fs for fed',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20.5, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }

    // if (index === 9) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 8.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 11],
    //       name: 'get to work, relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11, 13],
    //       name: 'courses - fs for fed',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 16],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16, 16.5],
    //       name: 'get some food',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16.5, 17],
    //       name: 'get home, relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17, 18.5],
    //       name: 'clean flat, shower',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.5, 20.5],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20.5, 22],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
  
    // if (index === 10) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.75],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.75, 7.75],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.75, 8.25],
    //       name: 'breakfast - pho',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 9],
    //       name: 'get to work, relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 15.25],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15.25, 15.75],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15.75, 18.75],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.75, 19.75],
    //       name: 'windows update',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19.75, 20.5],
    //       name: 'supper - pho',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [20.5, 23],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //   ]
    // }
  
    // if (index === 11) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7.75],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.75, 8.25],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 9.25],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.25, 9.5],
    //       name: 'get to work',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 10],
    //       name: 'work start routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10, 14],
    //       name: 'work start routine',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 15],
    //       name: 'take a break',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [15, 18],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18, 23],
    //       name: 'go home, do not sure yet',
    //       group: 'laze',
    //     },
    //   ]
    // }
  
    // if (index === 13) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11, 15],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 14) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 9],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9, 10],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11, 16.5], // so much fucking hassle with this outdated course. also, fuck that idiot that cannot make coffee
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 15) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 8.5],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9.5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 9.75],
    //       name: 'get to work',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.75, 10.5],
    //       name: 'work morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.5, 14],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14, 14.5],
    //       name: 'break',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [14.5, 18.5],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [18.5, 19],
    //       name: 'eat beefsteak',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [19, 20.5],
    //       name: 'watch tech youtube',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 16) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 7],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 7.25],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.25, 8],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.25],
    //       name: 'breakfast - pho',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 8.5],
    //       name: 'get to work',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 8.75],
    //       name: 'work morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.75, 9.5],
    //       name: 'watch youtube',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 12.75],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.75, 13.5],
    //       name: 'break',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13.5, 17],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17, 23],
    //       name: 'break',
    //       group: 'laze',
    //     },
    //   ]
    // }
  
    // if (index === 18) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 4.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [4.5, 5],
    //       name: 'morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [5, 5.75],
    //       name: 'youtube',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [5.75, 6.5],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.5, 8],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.25],
    //       name: 'get to work',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 8.5],
    //       name: 'work morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 12.5],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 12.75],
    //       name: 'relax',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.75, 13.5],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 21) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [9, 14],
    //       name: 'munich apartment/tax',
    //       group: 'essentials',
    //     },
    //   ]
    // }
  
    // if (index === 22) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [10, 13],
    //       name: 'munich apartment/tax',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 19],
    //       name: 'courses - k hands on',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 23) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [0, 6.5],
    //       name: 'sleep',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [6.5, 7],
    //       name: 'lie in bed',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7, 7.5],
    //       name: 'morning routine rushed',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [7.5, 8],
    //       name: 'breakfast - pho',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8, 8.25],
    //       name: 'walk to work',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.25, 8.5],
    //       name: 'work morning routine',
    //       group: 'essentials',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [8.5, 9.5],
    //       name: 'youtube',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [9.5, 13],
    //       name: 'organise fullstack notes',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13, 13.5],
    //       name: 'break',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [13.5, 16.5],
    //       name: 'youtube fullstack',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [16.5, 17],
    //       name: 'break',
    //       group: 'laze',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [17, 19.75],
    //       name: 'youtube fullstack',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 24) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [12, 16.5],
    //       name: 'youtube fullstack',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 25) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [13.5, 19],
    //       name: 'youtube fullstack',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 27) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [13, 16],
    //       name: 'upskill admin',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 28) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [9, 10.5],
    //       name: 'relocation admin',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [10.5, 11.5],
    //       name: 'upskill admin',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [11.5, 16.5],
    //       name: 'algorithms',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    // if (index === 29) {
    //   tasks = [
    //     {
    //       id: nanoid(),
    //       time: [11, 12.5],
    //       name: 'relocation admin',
    //       group: 'improvement',
    //     },
    //     {
    //       id: nanoid(),
    //       time: [12.5, 15.5],
    //       name: 'algorithms',
    //       group: 'improvement',
    //     },
    //   ]
    // }
  
    if (index === 0) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 7],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [7, 7.75],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7.75, 8.5],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.5, 8.75],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.75, 11],
          name: 'windows admin',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [11, 15],
          name: 'docker upskill',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [15, 15.5],
          name: 'get lunch',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [15.5, 19.5],
          name: 'frontend upskill',
          group: 'improvement',
        },
      ]
    }
  
    if (index === 1) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 6.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [6.5, 7.25],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7.25, 8.5],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.5, 9],
          name: 'breakfast - pho',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9, 9.25],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9.25, 10],
          name: 'laze',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [10, 16],
          name: 'frontend upskill',
          group: 'improvement',
        },
        {
          id: nanoid(),
          time: [16, 16.5],
          name: 'lunch',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [16.5, 18],
          name: 'frontend upskill',
          group: 'essentials',
        },
      ]
    }
  
    if (index === 2) {
      tasks = [
        {
          id: nanoid(),
          time: [0, 6.5],
          name: 'sleep',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [6.5, 7.25],
          name: 'lie in bed',
          group: 'laze',
        },
        {
          id: nanoid(),
          time: [7.25, 8.25],
          name: 'morning routine',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.25, 8.75],
          name: 'breakfast - pho',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [8.75, 9],
          name: 'get to work',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [9, 10],
          name: 'laze',
          group: 'essentials',
        },
        {
          id: nanoid(),
          time: [10, 16],
          name: 'frontend upskill',
          group: 'improvement',
        },
      ]
    }

    return {
      tasks,
      dateString,
    }
  }),
  hoursAxis: HOURS_IN_DAY,
  daysAxis: MONTH_DAYS_STRING,
}

export const { reducer, actions } = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    filterHours(state, { payload: { from, to } }) {
      state.hoursAxis = HOURS_IN_DAY.filter(hour => hour >= from && hour <= to)
    },
    filterDays(state, { payload: { from, to } }) {
      state.daysAxis = MONTH_DAYS
        .filter(day => format(day, 'd') >= from && format(day, 'd') <= to)
        .map(day => day.toString())
    },
    prepareTask(state, { payload: { name, group, from, to } }) {
      console.log('being prepared', { name, group, from, to })
      const taskBeingPrepared = {
        time: [from, 16],
        name,
        group: group?.name,
      }
      state.taskBeingPrepared = taskBeingPrepared
    },
    removePreparedTask(state) {
      state.taskBeingPrepared = undefined
    },
    editTask(state, { payload: { id, dateString } }) {
      state.taskBeingEdited = state.allTasksByDay
        .filter(x => x.dateString === dateString)[0].tasks
        .find(x => x.id === id)
    },
    saveTask(state, { payload: { id, name, dateString, group, from, to }}) {
      return {
        ...state,
        allTasksByDay: state.allTasksByDay.map((day) => {
          if (day.dateString !== dateString) return day
          return {
            ...day,
            tasks: day.tasks.map((task) => {
              if (task.id !== id) return task
              return {
                ...task,
                name,
                group,
                time: [Number(from), Number(to)]
              }
            })
          }
        }),
      }
    },
    addTask(state, { payload: { name, dateString, group, from, to }}) {
      console.log(name, dateString, group, from, to)
      const dayToUpdate = state.allTasksByDay.find(tasksByDay => tasksByDay.dateString === dateString)

      state.taskBeingEdited = {}
      dayToUpdate.tasks.push({
        id: nanoid(),
        time: [from, to],
        name,
        group: group.name,
      })
    }
  }
})
