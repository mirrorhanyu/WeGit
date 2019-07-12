import {
  FETCH_REPOSITORY_CONTENT_PENDING,
  FETCH_REPOSITORY_CONTENT_REJECTED,
  FETCH_REPOSITORY_CONTENT_FULFILLED
} from "../constants/repository"

export default function repository(state = {}, action) {
  switch (action.type) {
    case FETCH_REPOSITORY_CONTENT_PENDING:
      return {
        ...state, isRepositoryContentUpdated: false
      }
    case FETCH_REPOSITORY_CONTENT_REJECTED:
      return {
        ...state, isRepositoryContentUpdated: true
      }
    case FETCH_REPOSITORY_CONTENT_FULFILLED:
      return {
        ...state, isRepositoryContentUpdated: true, repositoryContent: action.payload.data
      }
    default:
      return state
  }
}
