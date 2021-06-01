import React, { Component } from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Lost?</h1>
                <center>
                    <p className="lead">We are there to guide you.</p>

                    <a className="btn btn-primary btn-lg" href="/" role="button">
                        Go Home
                    </a>
                </center>
            </div>
        );
    }
}

export default NotFoundPage;