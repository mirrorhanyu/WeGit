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

const fetchActivities = () => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCH_ACTIVITIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/developers/mirrorhanyu/events`,
        method: 'GET'
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

const loadMoreActivities = (page) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_MORE_ACTIVITIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/developers/mirrorhanyu/events?page=${page}`,
        method: 'GET'
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
