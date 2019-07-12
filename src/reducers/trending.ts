import {
  FETCH_TRENDING_REPOSITORIES_PENDING,
  FETCH_TRENDING_REPOSITORIES_REJECTED,
  FETCH_TRENDING_REPOSITORIES_FULFILLED,
  FETCH_TRENDING_DEVELOPERS_PENDING,
  FETCH_TRENDING_DEVELOPERS_REJECTED,
  FETCH_TRENDING_DEVELOPERS_FULFILLED,
  FETCH_TRENDING_LANGUAGES_PENDING,
  FETCH_TRENDING_LANGUAGES_REJECTED,
  FETCH_TRENDING_LANGUAGES_FULFILLED
} from "../constants/trending";

export default function trending(state = {}, action) {
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
    case FETCH_TRENDING_LANGUAGES_PENDING:
      return {
        ...state, isLanguagesUpdated: false
      }
    case FETCH_TRENDING_LANGUAGES_REJECTED:
      return {
        ...state, isLanguagesUpdated: true
      }
    case FETCH_TRENDING_LANGUAGES_FULFILLED:
      return {
        ...state, isLanguagesUpdated: true, languages: action.payload
      }
    default:
      return state
  }
}
