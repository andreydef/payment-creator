import React, { Component } from 'react'

class Description extends Component {
    render() {
        return (
            <div className="container">
                <h2><strong>Project Description</strong></h2>

                <p>This is a project created using the MERN stack, which used MongoDB as a database, React as frontend part, Node and Expess on backend part.</p>

                <p>The project does not have separate roles for the admin and for the average user, ie implemented only Google sign up and login.</p>

                <p>The site's products are predefined in a separate file and can be both imported into the database and deleted from it by a specific command.</p>

                <p>Integrated with PayPal and Stripe payment systems, with which you can purchase a specific product or a fixed subscription to use the product.</p>
            </div>
        );
    }
}

export default Description
