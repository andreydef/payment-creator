import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from "../components/login/Login"
import Profile from "../components/profile/Profile"
import Footer from "../components/layout/footer/Footer"
import Navbar from "../components/layout/navbar/Navbar"
import Home from "../components/layout/home/Home"
import ProductScreen from '../components/products/ProductScreen'

import "../App.css";

class Routing extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default Routing
