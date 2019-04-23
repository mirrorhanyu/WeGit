import { combineReducers } from 'redux'
import tab from "./tab";
import trending from "./trending";
import repository from "./repository";

export default combineReducers({
  tab,
  trending,
  repository
})
