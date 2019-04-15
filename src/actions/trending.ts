import Taro from "@tarojs/taro";
import {
  FETCH_REPOSITORIES_FULFILLED,
  FETCH_REPOSITORIES_PENDING,
  FETCH_REPOSITORIES_REJECTED
} from "../constants/trending";

export const fetchData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_REPOSITORIES_PENDING})
      const data = await Taro.request({
        url: 'https://github-trending-api.now.sh/repositories',
        method: 'GET'
      })
      dispatch({ type: FETCH_REPOSITORIES_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_REPOSITORIES_REJECTED, payload: e })
    }
  }
}
