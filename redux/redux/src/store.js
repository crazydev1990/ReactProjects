import { createStore } from "redux";
import combine from "./reducers/combine";

const store = createStore(combine)

export default store