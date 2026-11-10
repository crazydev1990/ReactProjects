import { combineReducers } from "redux"
import whatreducerdo from "./IncreDecre.js"
const combine=combineReducers({
    counter: whatreducerdo
})
export default combine