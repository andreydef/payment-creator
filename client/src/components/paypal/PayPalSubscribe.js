import React  from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

const PayPalSubscribe = ({ product }) => {
    const paypalSubscribe = (data, actions) => {
        return actions.subscription.create({
            'plan_id': "P-3H226719GE121945VMC5IQTI",
        });
    };

    const paypalOnError = (err) => {
        console.log('Error')
    }

    const responseOrder = (data) => {
        return fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentID: data.orderID,
                product: product,
                paymentType: 'PayPal Subscribe',
            })
        }).then(function(res) {
            return res.json();
        }).catch(err => console.log(err))
    }

    const paypalOnApprove = (data, detail) => {
        alert("Subscription completed");

        const resPay = fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                orderID: data.orderID,
                subscriptionID: data.subscriptionID,
                product: product,
                type: 'paypal'
            })
        })
        responseOrder(data)
        resPay.json()
    };

    return (
        <div>
            <PayPalButton
                amount="10.0"
                currency="USD"
                createSubscription={(data, details) => paypalSubscribe(data, details)}
                onApprove={(data, details) => paypalOnApprove(data, details)}
                options={{
                    // clientID of profile, which have active subscription
                    clientId: 'AZRtameGwLo6f_zKc73fnXRoR8zZX-dFzlHci18FIXRUlMY2rtdpZVPnXyYx5QhMDcZ0sE9tjDuDKSRR',
                    vault:true
                }}
                onError={(err) => paypalOnError(err)}
                catchError={(err) => paypalOnError(err)}
                onCancel={(err) => paypalOnError(err)}
                style={{
                    shape: 'rect',
                    color: 'blue',
                    layout: 'vertical',
                    label: 'subscribe',
                }}
            />
        </div>
    )
}

export default PayPalSubscribe
