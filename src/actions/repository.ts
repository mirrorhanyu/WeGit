import Taro from "@tarojs/taro";
import {
  FETCH_REPOSITORY_CONTENT_PENDING,
  FETCH_REPOSITORY_CONTENT_REJECTED,
  FETCH_REPOSITORY_CONTENT_FULFILLED
} from "../constants/repository";

const fetchRepositoryContent = (owner, repo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_REPOSITORY_CONTENT_PENDING})
      const data = await Taro.request({
        url: `https://api.callmehan.info/gitter/repository/${owner}/${repo}`,
        method: 'GET'
      })
      dispatch({ type: FETCH_REPOSITORY_CONTENT_FULFILLED, payload: data })
      return data
    } catch (e) {
      dispatch({ type: FETCH_REPOSITORY_CONTENT_REJECTED, payload: e })
    }
  }
}

export {
  fetchRepositoryContent as default
}
