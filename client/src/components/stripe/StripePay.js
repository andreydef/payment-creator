import React, { useState } from 'react'
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import CardInput from './CardInput';

import './Stripe.css'

const StripePay = ({ amount }) => {
    const [email, setEmail] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    // async function stripeTokenHandler(token) {
    //     const paymentMethod = { token: token.id }
    //
    //     const response = await fetch('/api/stripe-pay', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             token: paymentMethod,
    //             info: token,
    //             amount: amount
    //         })
    //     });
    //     return response.json()
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     const { error } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card: elements.getElement(CardElement)
    //     })
    //     if (error) {
    //         console.log('[error]', error);
    //         alert('Bad data')
    //     } else {
    //         alert('Success data')
    //         const card = elements.getElement(CardElement);
    //         const result = await stripe.createToken(card);
    //
    //         if (result.error) {
    //             console.log(result.error.message);
    //         } else {
    //             await stripeTokenHandler(result.token);
    //         }
    //     }
    // }

    const handleSubmitPay = async (event) => {
        if (!stripe || !elements) {
            return;
        }

        const response = await fetch('/api/stripe-pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                amount: amount
            })
         });

        let clientSecret = response.data.client_secret
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email,
                },
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                alert('Money is in the bank!');
            }
        }

        await response.json()
    };
    const handleSubmitSub = async (event) => {
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

            // const res = await axios.post('http://localhost:5000/stripe-subscribe', {
            //     'payment_method': result.paymentMethod.id,
            //     'email': email
            // });

            const response = await fetch('/api/stripe-subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_method: result.paymentMethod.id,
                    email: email
                })
            });

            // const {client_secret, status} = res.data;

            let clientSecret = response.data.client_secret
            let status = response.data.status
            if (status === 'requires_action') {
                stripe.confirmCardPayment(clientSecret).then(function(result) {
                    if (result.error) {
                        console.log('There was an issue!');
                        console.log(result.error);
                    } else {
                        console.log('You got the money!');
                    }
                });
            } else {
                console.log('You got the money!');
            }
        }
    };

    return (
        <form>
            <Card className='root'>
                <CardContent className='content'>
                    <TextField
                        label='Email'
                        id='outlined-email-input'
                        helperText={`Email you'll recive updates and receipts on`}
                        margin='normal'
                        variant='outlined'
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <CardInput />
                    <div className='div'>
                        <Button variant="contained" color="primary" className='button' onClick={handleSubmitPay}>
                            Pay
                        </Button>
                        <Button variant="contained" color="primary" className='button' onClick={handleSubmitSub}>
                            Subscription
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {/*<button role="link" className="payButton" onClick={handleSubmit}>*/}
            {/*    Checkout*/}
            {/*</button>*/}
        </form>
    );
}

export default StripePay
