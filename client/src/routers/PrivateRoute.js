import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loader from "react-loader-spinner"

export const PrivateRoute = ({ component: Component, isAuthenticated, isLogin, ...rest }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <Route
            {...rest}
            render={props => {
                if (isLogin && isAuthenticated === false) {
                    setTimeout(() => {
                        setIsLoaded(true)
                    },1000)

                    if (isLoaded === true) {
                        return (
                            <Redirect to="/" />
                        )
                    } else {
                        return (
                            <center>
                                <Loader
                                    type="Rings"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                />
                            </center>
                        )
                    }
                } else {
                    return isAuthenticated || isLogin ?
                        <Component {...props} /> :  <Redirect to="/" />;
                }
            }}
        />
    )
}
