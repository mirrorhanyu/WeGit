import Taro from "@tarojs/taro";
import {
  FETCH_DEVELOPERS_FULFILLED,
  FETCH_DEVELOPERS_PENDING, FETCH_DEVELOPERS_REJECTED,
  FETCH_REPOSITORIES_FULFILLED,
  FETCH_REPOSITORIES_PENDING,
  FETCH_REPOSITORIES_REJECTED
} from "../constants/trending";

export const fetchRepositories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_REPOSITORIES_PENDING})
      const data = await Taro.request({
        url: 'https://api.callmehan.info/gitter/repositories',
        method: 'GET'
      })
      dispatch({ type: FETCH_REPOSITORIES_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_REPOSITORIES_REJECTED, payload: e })
    }
  }
}

export const fetchDevelopers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_DEVELOPERS_PENDING})
      const data = await Taro.request({
        url: 'https://api.callmehan.info/gitter/developers',
        method: 'GET'
      })
      dispatch({ type: FETCH_DEVELOPERS_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_DEVELOPERS_REJECTED, payload: e })
    }
  }
}
