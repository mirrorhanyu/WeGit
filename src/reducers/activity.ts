import {
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_REJECTED,
  FETCH_ACTIVITIES_FULFILLED
} from "../constants/activity";

export default function activity(state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES_PENDING:
      return {
        ...state, isActivitiesUpdated: false
      }
    case FETCH_ACTIVITIES_REJECTED:
      return {
        ...state, isActivitiesUpdated: true
      }
    case FETCH_ACTIVITIES_FULFILLED:
      return {
        ...state, isActivitiesUpdated: true, activities: action.payload
      }
    default:
      return state
  }
}
