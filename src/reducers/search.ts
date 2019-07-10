import {
  SEARCH_REPOSITORIES_PENDING,
  SEARCH_REPOSITORIES_REJECTED,
  SEARCH_REPOSITORIES_FULFILLED
} from "../constants/search";

export default function search(state = {}, action) {
  switch (action.type) {
    case SEARCH_REPOSITORIES_PENDING:
      return {
        ...state, isSearchedRepositoriesUpdated: false
      }
    case SEARCH_REPOSITORIES_REJECTED:
      return {
        ...state, isSearchedRepositoriesUpdated: true
      }
    case SEARCH_REPOSITORIES_FULFILLED:
      return {
        ...state, isSearchedRepositoriesUpdated: true, searchedRepositories: action.payload
      }
    default:
      return state
  }
}
