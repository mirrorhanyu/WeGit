import {
  SEARCH_REPOSITORIES_PENDING,
  SEARCH_REPOSITORIES_REJECTED,
  SEARCH_REPOSITORIES_FULFILLED,
  LOAD_MORE_REPOSITORIES_PENDING,
  LOAD_MORE_REPOSITORIES_REJECTED,
  LOAD_MORE_REPOSITORIES_FULFILLED
} from "../constants/search";
import Search from "../types/search";

interface SearchState {
  isSearchedRepositoriesUpdated: boolean,
  isLoadingMoreRepositoriesUpdated: boolean,
  searchedRepositories: Search[],
  maxPagination: string
}

export default function search(state = {} as SearchState, action) {
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
        ...state, isSearchedRepositoriesUpdated: true,
        searchedRepositories: action.payload,
        maxPagination: action.addition.maxPage
      }
    case LOAD_MORE_REPOSITORIES_PENDING:
      return {
        ...state, isLoadingMoreRepositoriesUpdated: false
      }
    case LOAD_MORE_REPOSITORIES_REJECTED:
      return {
        ...state, isLoadingMoreRepositoriesUpdated: true
      }
    case LOAD_MORE_REPOSITORIES_FULFILLED:
      return {
        ...state,
        isLoadingMoreRepositoriesUpdated: true,
        searchedRepositories: [...state.searchedRepositories || [], ...action.payload],
        maxPagination: action.addition.maxPage
      }
    default:
      return state
  }
}
