import { SET_USER_ORDERS } from '../actions/types'

const initialState = {
    orders: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        default:
            return state;
    }
}
