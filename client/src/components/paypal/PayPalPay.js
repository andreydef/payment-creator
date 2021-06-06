import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

const PayPalPay = ({ amount }) => {
    const onSuccessPay = (details, data) => {
        alert("Transaction completed");
        return fetch('/api/paypal-pay', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: data.id
            })
        }).then(res => res.json())
            .then(res => console.log(res));

        // return fetch("/api/paypal-pay", {
        //     method: "post",
        //     body: JSON.stringify(data)
        // }).then((res) => {
        //     return res.json()
        // }).then((data) => {
        //     console.log(data);
        // });
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
