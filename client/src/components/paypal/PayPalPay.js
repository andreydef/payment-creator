import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

const PayPalPay = ({ amount, product }) => {
    const onSuccessPay = (details, data) => {
        alert("Transaction completed");

        return fetch('/api/paypal-pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderID: data.orderID,
                status: details.status,
                payer: details.payer,
                productName: product.name
            })
        }).then(function(res) {
            return res.json();
        }).catch(err => console.log(err))
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
