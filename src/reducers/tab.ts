import {TRENDING, ACTIVITY, SEARCH} from '../constants/tab'

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
    case SEARCH:
      return {
        ...state, current: SEARCH
      }
    default:
      return state
  }
}
