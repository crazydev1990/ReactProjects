{/* Locker Room Only Accessed By Manager To Update */}
import { createStore } from 'redux'
import IncreDecre from './reducer/IncreDecre.js'
import combine from './reducer/combine.js'
const store = createStore(combine)
export default store