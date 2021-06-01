import React from "react"
import { connect } from "react-redux"
import { PayPalButton } from 'react-paypal-button-v2'

import { setCurrentUser } from "../../actions/authActions"

import "./Profile.css"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  async componentDidMount() {
    await this.props.setCurrentUser();
  }
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="jumbotron">
          <h2 className="display-4">Welcome {this.props.auth.user.name}!</h2>
          <hr className="my-4" />
          <p className="lead">You profile data:</p>
          <center>
            <ul>
              <li>Your Name: {this.props.auth.user.name}</li>
              <li>Your Email: {this.props.auth.user.email}</li>
              <img className="photo" src={this.props.auth.user.photo} alt="" />
            </ul>
              <PayPalButton
                  amount="0.01"
                  onSuccess={(details, data) => {
                      alert("Transaction completed");
                      // OPTIONAL: Call your server to save the transaction
                      return fetch("/paypal-transaction-complete", {
                          method: "post",
                          body: JSON.stringify({
                              orderID: data.orderID
                          })
                      });
                  }}
              />
          </center>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Profile);
