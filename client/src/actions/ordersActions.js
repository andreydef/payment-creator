import axios from 'axios'

import { SET_USER_ORDERS } from './types'

export const setUserOrders = () => dispatch => {
    axios
        .get("/api/orders")
        .then(res => {
            dispatch({
                type: SET_USER_ORDERS,
                payload: res.data
            })
        }).catch(err =>
        console.log(err))
};
