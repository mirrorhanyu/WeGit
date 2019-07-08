import Taro from "@tarojs/taro";
import {FETCH_ACTIVITIES_FULFILLED, FETCH_ACTIVITIES_PENDING, FETCH_ACTIVITIES_REJECTED} from "../constants/activity";
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
        })
      })
      return
    } catch (e) {
      dispatch({type: FETCH_ACTIVITIES_REJECTED, payload: e})
    }
  }
}

export {
  fetchActivities as default
}
