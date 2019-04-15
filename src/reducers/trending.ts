import {
  FETCH_DEVELOPERS_FULFILLED,
  FETCH_DEVELOPERS_PENDING,
  FETCH_DEVELOPERS_REJECTED,
  FETCH_REPOSITORIES_FULFILLED,
  FETCH_REPOSITORIES_PENDING,
  FETCH_REPOSITORIES_REJECTED
} from "../constants/trending";

const INITIAL_STATE = {
  isRepositoriesUpdating: true,
  isDevelopersUpdating: true,
  repositories: [],
  developers: []
}

export default function trending(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_REPOSITORIES_PENDING:
      return {
        ...state, isRepositoriesUpdating: false
      }
    case FETCH_REPOSITORIES_REJECTED:
      return {
        ...state, isRepositoriesUpdating: true
      }
    case FETCH_REPOSITORIES_FULFILLED:
      return {
        ...state, isRepositoriesUpdating: true, repositories: action.payload.data
      }
    case FETCH_DEVELOPERS_PENDING:
      return {
        ...state, isDevelopersUpdating: false
      }
    case FETCH_DEVELOPERS_REJECTED:
      return {
        ...state, isDevelopersUpdating: true
      }
    case FETCH_DEVELOPERS_FULFILLED:
      return {
        ...state, isDevelopersUpdating: true
      }
    default:
      return state
  }
}
