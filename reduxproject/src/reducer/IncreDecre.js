{/* Business Logic: What to do /perform on User Action Request- Bank Manager/Cashier */}
const count=0
function whatreducerdo(state=count,action){
    switch(action.type){
        case 'INCREMENT':
            return state+1
        case 'DECREMENT':
            return state-1
        default:
            return state
    }
}
export default whatreducerdo