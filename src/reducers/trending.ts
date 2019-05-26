import {
  FETCH_TRENDING_REPOSITORIES_PENDING,
  FETCH_TRENDING_REPOSITORIES_REJECTED,
  FETCH_TRENDING_REPOSITORIES_FULFILLED,
  FETCH_TRENDING_DEVELOPERS_PENDING,
  FETCH_TRENDING_DEVELOPERS_REJECTED,
  FETCH_TRENDING_DEVELOPERS_FULFILLED
} from "../constants/trending";

const INITIAL_STATE = {
  isRepositoriesUpdating: true,
  isDevelopersUpdating: true,
  repositories: [],
  developers: []
}

export default function trending(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRENDING_REPOSITORIES_PENDING:
      return {
        ...state, isRepositoriesUpdating: true
      }
    case FETCH_TRENDING_REPOSITORIES_REJECTED:
      return {
        ...state, isRepositoriesUpdating: false
      }
    case FETCH_TRENDING_REPOSITORIES_FULFILLED:
      return {
        ...state, isRepositoriesUpdating: false, repositories: action.payload.data
      }
    case FETCH_TRENDING_DEVELOPERS_PENDING:
      return {
        ...state, isDevelopersUpdating: true
      }
    case FETCH_TRENDING_DEVELOPERS_REJECTED:
      return {
        ...state, isDevelopersUpdating: false
      }
    case FETCH_TRENDING_DEVELOPERS_FULFILLED:
      return {
        ...state, isDevelopersUpdating: false, developers: action.payload.data
      }
    default:
      return state
  }
}
