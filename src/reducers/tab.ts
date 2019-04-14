import {TRENDING, ACTIVITY} from '../constants/tab'

const INITIAL_STATE = {
  current: TRENDING
}

export default function tab(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRENDING:
      return {
        ...state, current: TRENDING
      }
    case ACTIVITY:
      return {
        ...state, current: ACTIVITY
      }
    default:
      return state
  }
}
