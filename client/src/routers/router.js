import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'

import Login from "../components/pages/login/Login"
import Navbar from "../components/layout/navbar/Navbar"
import Footer from "../components/layout/footer/Footer"

import Description from '../components/pages/description/Description'
import PrivacyPolicy from '../components/pages/privacy-policy/PrivacyPolicy'
import Therms from '../components/pages/therms/Therms'
import Profile from "../components/pages/profile/Profile"
import Home from "../components/layout/home/Home"
import ProductScreen from '../components/products/ProductScreen'

import "../App.css";

import { setCurrentUser } from "../actions/authActions";
import { PrivateRoute } from './PrivateRoute'

class Routing extends Component {
    async componentDidMount() {
        await this.props.setCurrentUser()
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/description" component={Description} />
                            <Route path="/therms" component={Therms} />
                            <Route path="/privacy-policy" component={PrivacyPolicy} />
                            <Route path="/profile" component={Profile} />
                            <PrivateRoute
                                exact
                                path="/products"
                                component={Home}
                                isAuthenticated={this.props.isAuthenticated}
                                isLogin={this.props.isLogin}
                            />
                            <PrivateRoute
                                exact
                                path="/product/:id"
                                component={ProductScreen}
                                isAuthenticated={this.props.isAuthenticated}
                                isLogin={this.props.isLogin}
                            />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { setCurrentUser }
)(Routing);
