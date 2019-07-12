import {
  FETCH_DEVELOPER_CONTENT_PENDING,
  FETCH_DEVELOPER_CONTENT_REJECTED,
  FETCH_DEVELOPER_CONTENT_FULFILLED
} from "../constants/developer"

export default function developer(state = {}, action) {
  switch (action.type) {
    case FETCH_DEVELOPER_CONTENT_PENDING:
      return {
        ...state, isDeveloperContentUpdated: false
      }
    case FETCH_DEVELOPER_CONTENT_REJECTED:
      return {
        ...state, isDeveloperContentUpdated: true
      }
    case FETCH_DEVELOPER_CONTENT_FULFILLED:
      return {
        ...state, isDeveloperContentUpdated: true, developerContent: action.payload
      }
    default:
      return state
  }
}
