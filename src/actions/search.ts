import Taro from "@tarojs/taro";
import {
  SEARCH_REPOSITORIES_PENDING,
  SEARCH_REPOSITORIES_REJECTED,
  SEARCH_REPOSITORIES_FULFILLED,
  LOAD_MORE_REPOSITORIES_PENDING,
  LOAD_MORE_REPOSITORIES_REJECTED,
  LOAD_MORE_REPOSITORIES_FULFILLED
} from "../constants/search";
import Search from "../types/search";

const searchRepositories = (name) => {
  return async (dispatch) => {
    try {
      dispatch({type: SEARCH_REPOSITORIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/search/repositories?name=${name}`,
        method: 'GET'
      })
      dispatch({
        type: SEARCH_REPOSITORIES_FULFILLED,
        payload: response.data.map(search => {
          return new Search(search)
        }),
        addition: {
          searchedRepo: name,
          maxPage: response.header['Max-Page'],
          currentPagination: 1
        }
      })
      return
    } catch (e) {
      dispatch({type: SEARCH_REPOSITORIES_REJECTED, payload: e})
    }
  }
}

const loadMoreRepositories = (name, page) => {
  return async (dispatch) => {
    try {
      dispatch({type: LOAD_MORE_REPOSITORIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/search/repositories?name=${name}&page=${page}`,
        method: 'GET'
      })
      dispatch({
        type: LOAD_MORE_REPOSITORIES_FULFILLED,
        payload: response.data.map(search => {
          return new Search(search)
        }),
        addition: {
          searchedRepo: name,
          maxPage: response.header['Max-Page'],
          currentPagination: page
        }
      })
      return
    } catch (e) {
      dispatch({type: LOAD_MORE_REPOSITORIES_REJECTED, payload: e})
    }
  }

}

export {
  searchRepositories,
  loadMoreRepositories
}
