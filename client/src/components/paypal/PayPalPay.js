import React, { useState } from 'react'
import { Redirect } from "react-router-dom"

import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

const PayPalPay = ({ amount, product }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const responseOrder = (data) => {
        return fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentID: data.orderID,
                product: product,
                paymentType: 'PayPal'
            })
        }).then(function(res) {
            setIsLoaded(true)
            return res.json();
        }).catch(err => console.log(err))
    }

    const onSuccessPay = (details, data) => {
        const resPay = fetch('/api/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderID: data.orderID,
                status: details.status,
                payer: details.payer,
                product: product,
                type: 'paypal'
            })
        })
        responseOrder(data)
        resPay.json()
    }

    if (isLoaded === true) {
        return (
            <Redirect to="/profile" />
        )
    } else {
        return (
            <div>
                <PayPalButton
                    amount={amount}
                    onSuccess={onSuccessPay}
                />
            </div>
        )
    }
}

export default PayPalPay
