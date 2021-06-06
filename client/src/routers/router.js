import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from "../components/pages/login/Login"
import Navbar from "../components/layout/navbar/Navbar"
import Home from "../components/layout/home/Home"
import Footer from "../components/layout/footer/Footer"

import Description from '../components/pages/description/Description'
import PrivacyPolicy from '../components/pages/privacy-policy/PrivacyPolicy'
import Therms from '../components/pages/therms/Therms'
import Profile from "../components/pages/profile/Profile"

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
                        <Route path="/login" component={Login} />
                        <Route path="/description" component={Description} />
                        <Route path="/therms" component={Therms} />
                        <Route path="/privacy-policy" component={PrivacyPolicy} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/product/:id" component={ProductScreen} />
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default Routing
