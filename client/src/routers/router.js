import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from 'react-private-route'
import { connect } from 'react-redux'

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
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route path="/description" component={Description} />
                            <Route path="/therms" component={Therms} />
                            <Route path="/privacy-policy" component={PrivacyPolicy} />
                            <Route path="/profile" component={Profile} />
                            <PrivateRoute path="/products" component={Home} isAuthenticated={this.props.isAuthenticated} />
                            <PrivateRoute path="/product/:id" component={ProductScreen} isAuthenticated={this.props.isAuthenticated} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    {}
)(Routing);
