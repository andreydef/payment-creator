import React, { Component } from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

class PayPalPay extends Component {
    render() {
        return (
            <div>
                <PayPalButton
                    amount="10.0"
                    onSuccess={(details, data) => {
                        alert("Transaction completed");
                        // OPTIONAL: Call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
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
}

export default PayPalPay
