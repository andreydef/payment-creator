import React,  { useState, useEffect } from 'react'
import axios from "axios";

import {Row, Col } from 'react-bootstrap'
import './Home.css'

import Products from '../../products/Products'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/products");
            setProducts(data);
        };

        fetchProducts();
    }, []);

     return (
            <>
                <h1>Products</h1>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Products product={product} />
                        </Col>
                    ))}
                </Row>
            </>
        );
}

export default Home
