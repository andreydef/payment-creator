import React  from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, isAuthenticated, isLogin, ...rest }) => {
    console.log(window.location.pathname)
    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated && isLogin ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/test',
                            state: { from: props.location }
                        }}
                    />
                )
            )}
        />
    )
}