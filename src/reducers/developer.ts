import {
  FETCH_DEVELOPER_CONTENT_PENDING,
  FETCH_DEVELOPER_CONTENT_REJECTED,
  FETCH_DEVELOPER_CONTENT_FULFILLED
} from "../constants/developer"

const INITIAL_STATE = {
  isDeveloperContentUpdated: false,
  developerContent: {},
}

export default function developer(state = INITIAL_STATE, action) {
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
