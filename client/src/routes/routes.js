import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from '../components/auth/Login'
import Profile from '../components/user/Profile'

class Routes extends Component {
    render() {
        return (
           <Router>
               <div>
                   <Route exact path='/login' component={Login} />
                   <Route exact path='/profile' component={Profile} />
               </div>
           </Router>
        );
    }
}

export default Routes;