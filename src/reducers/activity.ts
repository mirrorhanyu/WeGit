import {
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_REJECTED,
  FETCH_ACTIVITIES_FULFILLED,
  LOAD_MORE_ACTIVITIES_PENDING,
  LOAD_MORE_ACTIVITIES_REJECTED,
  LOAD_MORE_ACTIVITIES_FULFILLED
} from "../constants/activity";
import Activity from "../types/activity";

interface ActivityState {
  isActivitiesUpdated: boolean,
  isLoadingMoreActivitiesUpdated: boolean,
  activities: Activity[],
  maxPagination: string
}

export default function activity(state = {} as ActivityState, action) {
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
        ...state,
        isActivitiesUpdated: true,
        activities: action.payload,
        maxPagination: action.addition.maxPage
      }
    case LOAD_MORE_ACTIVITIES_PENDING:
      return {
        ...state, isLoadingMoreActivitiesUpdated: false
      }
    case LOAD_MORE_ACTIVITIES_REJECTED:
      return {
        ...state, isLoadingMoreActivitiesUpdated: true
      }
    case LOAD_MORE_ACTIVITIES_FULFILLED:
      return {
        ...state,
        isLoadingMoreActivitiesUpdated: true,
        activities: [...state.activities, ...action.payload],
        maxPagination: action.addition.maxPage
      }
    default:
      return state
  }
}
