import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

const PayPalPay = ({ amount, product }) => {

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
            return res.json();
        }).catch(err => console.log(err))
    }

    const onSuccessPay = (details, data) => {
        alert("Transaction completed");

        const resPay = fetch('/api/paypal-pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderID: data.orderID,
                status: details.status,
                payer: details.payer,
                product: product
            })
        })
        responseOrder(data)
        resPay.json()
    }
        return (
            <div>
                <PayPalButton
                    amount={amount}
                    onSuccess={onSuccessPay}
                />
            </div>
        );
}

export default PayPalPay
