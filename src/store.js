import {createStore} from 'redux'

function Reducer(state = {}, action) {
    let newState = Object.assign(state)
    switch(action.type) {
        case 'SET_CHAR':
            newState = action.payload
            break

        case 'PACK':
            newState.pack = action.payload
            break

        case 'NOTES':
            newState.notes = action.payload
            break
            
        default:
            console.log(action.type)
            break
    }
    console.log(newState)
    return newState
}

var store = createStore(Reducer)

export default store