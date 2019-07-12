import Taro from "@tarojs/taro";
import {
  FETCH_TRENDING_DEVELOPERS_FULFILLED,
  FETCH_TRENDING_DEVELOPERS_PENDING,
  FETCH_TRENDING_DEVELOPERS_REJECTED,
  FETCH_TRENDING_REPOSITORIES_FULFILLED,
  FETCH_TRENDING_REPOSITORIES_PENDING,
  FETCH_TRENDING_REPOSITORIES_REJECTED,
  FETCH_TRENDING_LANGUAGES_PENDING,
  FETCH_TRENDING_LANGUAGES_REJECTED,
  FETCH_TRENDING_LANGUAGES_FULFILLED
} from "../constants/trending";

export const fetchRepositories = (since, language) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRENDING_REPOSITORIES_PENDING})
      const data = await Taro.request({
        url: `https://api.callmehan.info/gitter/trending-repositories?since=${since}&language=${language}`.replace('&language=all', ''),
        method: 'GET',
      })
      dispatch({ type: FETCH_TRENDING_REPOSITORIES_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_TRENDING_REPOSITORIES_REJECTED, payload: e })
    }
  }
}

export const fetchDevelopers = (since, language) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRENDING_DEVELOPERS_PENDING})
      const data = await Taro.request({
        url: `https://api.callmehan.info/gitter/trending-developers?since=${since}&language=${language}`.replace('&language=all', ''),
        method: 'GET'
      })
      dispatch({ type: FETCH_TRENDING_DEVELOPERS_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_TRENDING_DEVELOPERS_REJECTED, payload: e })
    }
  }
}

export const fetchLanguages = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRENDING_LANGUAGES_PENDING})
      const response = await Taro.request({
        url: 'https://api.callmehan.info/gitter/trending-languages',
        method: 'GET'
      })
      dispatch({ type: FETCH_TRENDING_LANGUAGES_FULFILLED, payload: ['All', ...response.data] })
    } catch (e) {
      dispatch({ type: FETCH_TRENDING_LANGUAGES_REJECTED, payload: e })
    }
  }
}
