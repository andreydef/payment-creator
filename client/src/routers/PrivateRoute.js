import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getCookie } from 'react-use-cookie';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                getCookie('user') ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}