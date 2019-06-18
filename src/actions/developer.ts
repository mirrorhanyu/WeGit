import Taro from "@tarojs/taro";
import {
  FETCH_DEVELOPER_CONTENT_PENDING,
  FETCH_DEVELOPER_CONTENT_REJECTED,
  FETCH_DEVELOPER_CONTENT_FULFILLED
} from "../constants/developer";

const fetchDeveloperContent = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_DEVELOPER_CONTENT_PENDING})
      const data = await Taro.request({
        url: `https://api.callmehan.info/gitter/developer/${name}`,
        method: 'GET'
      })
      dispatch({ type: FETCH_DEVELOPER_CONTENT_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_DEVELOPER_CONTENT_REJECTED, payload: e })
    }
  }
}

export {
  fetchDeveloperContent as default
}
