import React  from 'react'
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CardInput from './CardInput';

import './Stripe.css'

const StripePay = ({ email, amount, product }) => {
    const stripe = useStripe()
    const elements = useElements()

    const responseOrder = (result) => {
        return fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentID: result.paymentMethod.id,
                product: product,
                paymentType: 'StripePay'
            })
        }).then(function(res) {
            return res.json();
        }).catch(err => console.log(err))
    }

    const handleSubmit = async (event) => {
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email
            },
        });

        if (result.error) {
            console.log(result.error.message);
            alert('Error result')
        } else {
            const res = await fetch('/api/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_method: result.paymentMethod.id,
                    email: email,
                    amount: amount,
                    product: product,
                    type: 'stripe'
                })
            });
            responseOrder(result)
            res.json()

            alert('Success Pay!');
            const { client_secret } = res.body;
            await stripe.confirmCardPayment(client_secret);
        }
    };

    return (
        <form>
            <Card className='root'>
                <CardContent className='content'>
                    <CardInput />
                    <div className='div'>
                        <Button variant="contained" color="primary" className='button' onClick={handleSubmit}>
                            Pay
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

export default StripePay
