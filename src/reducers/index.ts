import { combineReducers } from 'redux'
import tab from "./tab";
import trending from "./trending";
import repository from "./repository";
import developer from "./developer";
import activity from "./activity";
import search from "./search";

export default combineReducers({
  tab,
  trending,
  repository,
  developer,
  activity,
  search
})
