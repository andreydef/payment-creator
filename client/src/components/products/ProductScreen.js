import React,  { useState, useEffect } from "react"
import axios from "axios"

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import './Products.css'

import PayPalPay from "../paypal/PayPalPay"
import PayPalSubscribe from "../paypal/PayPalSubscribe"

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [match]);

    function payment() {
        if (product.payment_type === 'payment') {
            return (
                <ListGroup.Item>
                    <PayPalPay amount={product.price} />
                </ListGroup.Item>
            )
        } else {
            return (
                <ListGroup.Item>
                    <PayPalSubscribe />
                </ListGroup.Item>
            )
        }
    }

    // const nonAuthorize = (
    //     <Link className="btn btn-dark my-3" to="/">
    //         Login
    //     </Link>
    // );

    return (
        <>
            <Link className="btn btn-dark my-3" to="/products">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
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
