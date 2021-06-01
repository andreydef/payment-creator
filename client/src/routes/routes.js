import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from '../components/auth/login/Login'
import Profile from '../components/user/profile/Profile'
import Home from '../components/layout/home/Home'
import Footer from '../components/layout/footer/Footer'
import Navbar from "../components/navbar/Navbar";
import PostForm from "../components/posts/PostForm";
import Posts from "../components/posts/Posts";
import NotFoundPage from "../components/not-found-page/NotFoundPage";

class Routes extends Component {
    render() {
        return (
           <Router>
               <Navbar />
               <Route exact path="/" component={Home} />
               <div className="container">
                   <Route exact path="/login" component={Login} />
                   <Route exact path="/not-found" component={NotFoundPage} />
                   <Route exact path="/profile" component={Profile} />
                   <Route exact path="/create" component={PostForm} />
                   <Route exact path="/posts" component={Posts} />
               </div>
               <Footer />
           </Router>
        );
    }
}

export default Routes;