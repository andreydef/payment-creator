import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

const PayPalPay = ({ amount }) => {
        return (
            <div>
                <PayPalButton
                    amount={amount}
                    onSuccess={(details, data) => {
                        alert("Transaction completed");
                        return fetch("/paypal-pay", {
                            method: "post",
                            body: JSON.stringify({
                                orderID: data.orderID
                            })
                        });
                    }}
                />
            </div>
        );
}

export default PayPalPay
