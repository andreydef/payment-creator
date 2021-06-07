import React, { Component } from 'react'
import { PayPalButton } from "react-paypal-button-v2"

import './PayPal.css'

class PayPalSubscribe extends Component {
    paypalSubscribe = (data, actions) => {
        return actions.subscription.create({
            'plan_id': "P-3H226719GE121945VMC5IQTI",
        });
    };

    paypalOnError = (err) => {
        alert('Error')
    }

    paypalOnApprove = (data, detail) => {
        alert("Subscription completed");

        return fetch('/api/paypal-subscribe', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                orderID: data.orderID,
                subscriptionID: data.subscriptionID
            })
        }).then(function(res) {
            return res.json();
        }).catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <PayPalButton
                    amount="10.0"
                    currency="USD"
                    createSubscription={(data, details) => this.paypalSubscribe(data, details)}
                    onApprove={(data, details) => this.paypalOnApprove(data, details)}
                    options={{
                        clientId: 'AZRtameGwLo6f_zKc73fnXRoR8zZX-dFzlHci18FIXRUlMY2rtdpZVPnXyYx5QhMDcZ0sE9tjDuDKSRR',
                        vault:true
                    }}
                    onError={(err) => this.paypalOnError(err)}
                    catchError={(err) => this.paypalOnError(err)}
                    onCancel={(err) => this.paypalOnError(err)}
                    style={{
                        shape: 'rect',
                        color: 'blue',
                        layout: 'vertical',
                        label: 'subscribe',
                    }}
                />
            </div>
        );
    }
}

export default PayPalSubscribe
