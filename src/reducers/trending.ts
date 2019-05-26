import {
  FETCH_TRENDING_REPOSITORIES_PENDING,
  FETCH_TRENDING_REPOSITORIES_REJECTED,
  FETCH_TRENDING_REPOSITORIES_FULFILLED,
  FETCH_TRENDING_DEVELOPERS_PENDING,
  FETCH_TRENDING_DEVELOPERS_REJECTED,
  FETCH_TRENDING_DEVELOPERS_FULFILLED
} from "../constants/trending";

const INITIAL_STATE = {
  isRepositoriesUpdated: false,
  isDevelopersUpdated: false,
  repositories: [],
  developers: []
}

export default function trending(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRENDING_REPOSITORIES_PENDING:
      return {
        ...state, isRepositoriesUpdated: false
      }
    case FETCH_TRENDING_REPOSITORIES_REJECTED:
      return {
        ...state, isRepositoriesUpdated: true
      }
    case FETCH_TRENDING_REPOSITORIES_FULFILLED:
      return {
        ...state, isRepositoriesUpdated: true, repositories: action.payload.data
      }
    case FETCH_TRENDING_DEVELOPERS_PENDING:
      return {
        ...state, isDevelopersUpdated: false
      }
    case FETCH_TRENDING_DEVELOPERS_REJECTED:
      return {
        ...state, isDevelopersUpdated: true
      }
    case FETCH_TRENDING_DEVELOPERS_FULFILLED:
      return {
        ...state, isDevelopersUpdated: true, developers: action.payload.data
      }
    default:
      return state
  }
}
