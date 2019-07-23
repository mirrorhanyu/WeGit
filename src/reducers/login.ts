import {
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGIN_FULFILLED
} from "../constants/login"

export default function login(state = {}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state, isLoginUpdated: false
      }
    case LOGIN_REJECTED:
      return {
        ...state, isLoginUpdated: true
      }
    case LOGIN_FULFILLED:
      return {
        ...state, isLoginUpdated: true, loginInfo: action.payload
      }
    default:
      return state
  }
}
