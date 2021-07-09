import React,  { useState, useEffect } from "react"
import axios from "axios"

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import './Products.css'

import PayPalPay from "../paypal/PayPalPay"
import PayPalSubscribe from "../paypal/PayPalSubscribe"
import StripePay from '../stripe/StripePay'
import StripeSubscribe from '../stripe/StripeSubscribe'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Loader from "react-loader-spinner"

const stripePromise = loadStripe('pk_test_51IzoTdK5elvk04pSkswtkSVcW7jEq15clMYaorzM8v8sxBBSPF1u8wOs73QCIOhErLReuTYQw1S2bjuQRfKTzwk000m70IkHl1');

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({});
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`);

            let product
            for (const key of data.keys()) {
                product = data[key]
            }
            setProduct(product);
        };
        fetchProduct();

        const fetchProfile = async () => {
            const { data } = await axios.get(`/api/current_user`);
            setProfile(data);
        };
        fetchProfile();
    }, [match]);

    function payment() {
        if (product.payment_type === 'payment') {
            return (
                <div>
                    <ListGroup.Item className='paypal'>
                        <p>PayPal</p>
                        <PayPalPay user={profile.email} amount={product.price} product={product} />
                    </ListGroup.Item>
                    <ListGroup.Item className='stripe'>
                        <Elements stripe={stripePromise}>
                            <p>Stripe</p>
                            <StripePay email={profile.email} amount={product.price} product={product} />
                        </Elements>
                    </ListGroup.Item>
                </div>
            )
        } else if (product.payment_type === 'subscription') {
            return (
                <div>
                    <ListGroup.Item className='paypal'>
                        <p>PayPal</p>
                        <PayPalSubscribe email={profile.email} product={product} />
                    </ListGroup.Item>
                    <ListGroup.Item className='stripe'>
                        <p>Stripe</p>
                        <Elements stripe={stripePromise}>
                            <StripeSubscribe email={profile.email} product={product} />
                        </Elements>
                    </ListGroup.Item>
                </div>
            )
        } else if (product.payment_type === 'Cancel subscription') {
            return (
                <div>
                    <ListGroup.Item className='paypal'>
                        <p>PayPal</p>
                        <PayPalSubscribe product={product} />
                    </ListGroup.Item>
                    <ListGroup.Item className='stripe'>
                        <p>Stripe</p>
                        <Elements stripe={stripePromise}>
                            <StripeSubscribe email={profile.email} product={product} />
                        </Elements>
                    </ListGroup.Item>
                </div>
            )
        } else {
            return (
                <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            )
        }
    }

    return (
        <>
            <Link className="btn btn-dark my-3 ml-3" to="/">
                Go Back
            </Link>
            <Row>
                <Col md={6} className='image'>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3} className='description'>
                    <ListGroup.Item variant="flush">
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </Col>
                <Col md={3}>
                    <Card className="cart">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.status}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Type:</Col>
                                    <Col>
                                        {product.payment_type}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card className="cart">
                        <ListGroup variant="flush">
                            { payment() }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen
