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

const StripeSubscribe = ({ email, product }) => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: email,
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentID: result.paymentMethod.id,
                    paymentType: 'Stripe Subscribe',
                    payment_method: result.paymentMethod.id,
                    user_email: email,
                    product: product,
                    type: 'stripe'
                })
            });
            response.json()

            const { client_secret, status  } = response.body;
            if (status === 'requires_action') {
                alert('Error subscription!');
            } else {
                alert('Success subscribe!');
                await stripe.confirmCardPayment(client_secret)
            }
        }
    };

    return (
        <form>
            <Card className='root'>
                <CardContent className='content'>
                    <CardInput />
                    <div className='div'>
                        <Button variant="contained" color="primary" className='button' onClick={handleSubmit}>
                            Subscribe
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

export default StripeSubscribe
