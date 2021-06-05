import React, { Component } from "react"
import { connect } from "react-redux"

import { setCurrentUser } from "../../actions/authActions"

// import PayPalPay from '../paypal/PayPalPay'
import PayPalSubscribe from '../paypal/PayPalSubscribe'

import "./Profile.css"

class Profile extends Component {
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
              {/*<PayPalPay />*/}
              <PayPalSubscribe />
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
