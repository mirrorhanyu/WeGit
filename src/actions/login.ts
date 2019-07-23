import Taro from "@tarojs/taro";
import {
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_FULFILLED
} from "../constants/login";
import DeveloperContent from "../types/developerContent";

const loginAndFetchUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_PENDING})
      const response = await Taro.request({
        url: `https://api.callmehan.info/gitter/developers?token=${token}`,
        method: 'GET'
      })
      if (response.statusCode === 200) {
        const user = new DeveloperContent(response.data);
        dispatch({ type: LOGIN_FULFILLED, payload: user})
        await Taro.setStorage({key: 'token', data: token})
        await Taro.setStorage({key: 'user', data: JSON.stringify(user)})
      } else {
        dispatch({ type: LOGIN_REJECTED })
      }
      return
    } catch (e) {
      dispatch({ type: LOGIN_REJECTED, payload: e })
    }
  }
}

export {
  loginAndFetchUser as default
}
