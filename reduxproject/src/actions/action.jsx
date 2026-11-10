{/* On Button Click Pass Events By User Action - Customer*/}
function doincrement() {
    return {
        type: 'INCREMENT'
    }
}
function dodecrement() {
    return {
        type: 'DECREMENT'
    }
}
export {doincrement,dodecrement};
