import Taro from "@tarojs/taro";
import {
  FETCH_ACTIVITIES_FULFILLED,
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_REJECTED,
  LOAD_MORE_ACTIVITIES_PENDING,
  LOAD_MORE_ACTIVITIES_REJECTED,
  LOAD_MORE_ACTIVITIES_FULFILLED
} from "../constants/activity";
import Activity from "../types/activity";

const fetchActivities = (token, username) => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCH_ACTIVITIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/developers/${username}/events`,
        method: 'GET',
        header: {'Authorization': token}
      })
      dispatch({
        type: FETCH_ACTIVITIES_FULFILLED,
        payload: response.data.map(activity => {
          return new Activity(activity)
        }),
        addition: {maxPage: response.header['Max-Page']}
      })
      return
    } catch (e) {
      dispatch({type: FETCH_ACTIVITIES_REJECTED, payload: e})
    }
  }
}

const loadMoreActivities = (token, username, page) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_MORE_ACTIVITIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/developers/${username}/events?page=${page}`,
        method: 'GET',
        header: {'Authorization': token}
      })
      dispatch({
        type: LOAD_MORE_ACTIVITIES_FULFILLED,
        payload: response.data.map(activity => {
          return new Activity(activity)
        }),
        addition: {maxPage: response.header['Max-Page']}
      })
      return
    } catch (e) {
      dispatch({type: LOAD_MORE_ACTIVITIES_REJECTED, payload: e})
    }
  }
}

export {
  fetchActivities,
  loadMoreActivities
}
