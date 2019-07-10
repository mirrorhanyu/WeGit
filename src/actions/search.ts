import Taro from "@tarojs/taro";
import {
  SEARCH_REPOSITORIES_PENDING,
  SEARCH_REPOSITORIES_REJECTED,
  SEARCH_REPOSITORIES_FULFILLED
} from "../constants/search";
import Search from "../types/search";

const searchRepositories = (name) => {
  return async (dispatch) => {
    try {
      dispatch({type: SEARCH_REPOSITORIES_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/search/repositories?q=${name}`,
        method: 'GET'
      })
      dispatch({
        type: SEARCH_REPOSITORIES_FULFILLED,
        payload: response.data.items.map(search => {
          return new Search(search)
        })
      })
      return
    } catch (e) {
      dispatch({type: SEARCH_REPOSITORIES_REJECTED, payload: e})
    }
  }
}

export {
  searchRepositories as default
}
