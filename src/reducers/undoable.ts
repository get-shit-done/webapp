// https://redux.js.org/recipes/implementing-undo-history/

function undoable(reducer: any) {
  const initialState: { past: any, present: any } = {
    past: [],
    present: reducer(undefined, {}),
  }

  return function(state = initialState, action: any) {
    const { past, present } = state

    switch (action.type) {
      case 'UNDO': {
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
        }
      }
      default: {
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [...past, present],
          present: newPresent,
        }
      }
    }
  }
}

export default undoable
