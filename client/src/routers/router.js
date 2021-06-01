import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from "../components/login/Login"
import Profile from "../components/profile/Profile"
import Footer from "../components/footer/Footer"
import Navbar from "../components/navbar/Navbar"

import "../App.css";

class Routing extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default Routing