import { combineReducers } from "redux";
import reducersupdate from "./incredecr";

const combine = combineReducers({ counter: reducersupdate })

export default combine