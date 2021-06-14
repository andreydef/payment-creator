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
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    async componentDidMount() {
        await this.props.setCurrentUser()

        if (this.props.isAuthenticated === false) {
            this.setState({ isLogin: true })
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                        <Navbar />

                            <Route exact path="/" component={Login} />
                            <Route path="/description" component={Description} />
                            <Route path="/therms" component={Therms} />
                            <Route path="/privacy-policy" component={PrivacyPolicy} />
                            <Route path="/profile" component={Profile} />
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/products"
                                component={Home}
                                isAuthenticated={this.props.isAuthenticated}
                                isLogin={this.state.isLogin}
                            />
                            <PrivateRoute
                                exact
                                path="/product/:id"
                                component={ProductScreen}
                                isAuthenticated={this.props.isAuthenticated}
                                isLogin={this.state.isLogin}
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
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { setCurrentUser }
)(Routing);
