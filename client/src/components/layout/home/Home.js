import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'
import './Home.css'

import Products from '../../products/Products'

import { connect } from "react-redux";
import { setCurrentUser } from "../../../actions/authActions";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        await this.props.setCurrentUser();

        fetch('/api/products')
            .then(res => res.json())
            .then(result => {
                this.setState({ products: result })
            })
    }

    render() {
        const { products } = this.state
        return (
            <>
                <h1 className='product'>Products</h1>
                <Row>
                    {products ? products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Products product={product} />
                        </Col>
                    )) : <p>You don't have products!</p> }
                </Row>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { setCurrentUser }
)(Home);
