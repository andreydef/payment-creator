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

  paypalSubscribe = (data, actions) => {
    return actions.subscription.create({
      'plan_id': "P-3H226719GE121945VMC5IQTI",
    });
  };test

  paypalOnError = (err) => {
      alert('Error')
  }

  paypalOnApprove = (data, detail) => {
     console.log(data)
     alert('Success')
  };

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
              {/*<PayPalButton*/}
              {/*    amount="10.0"*/}
              {/*    onSuccess={(details, data) => {*/}
              {/*        alert("Transaction completed");*/}
              {/*        // OPTIONAL: Call your server to save the transaction*/}
              {/*        return fetch("/paypal-transaction-complete", {*/}
              {/*            method: "post",*/}
              {/*            body: JSON.stringify({*/}
              {/*                orderID: data.orderID*/}
              {/*            })*/}
              {/*        });*/}
              {/*    }}*/}
              {/*/>*/}
              <PayPalButton
                  amount="20.0"
                  currency="USD"
                  createSubscription={(data, details) => this.paypalSubscribe(data, details)}
                  onApprove={(data, details) => this.paypalOnApprove(data, details)}
                  options={{
                      clientId: 'AZRtameGwLo6f_zKc73fnXRoR8zZX-dFzlHci18FIXRUlMY2rtdpZVPnXyYx5QhMDcZ0sE9tjDuDKSRR',
                      vault:true
                  }}
                  onError={(err) => this.paypalOnError(err)}
                  catchError={(err) => this.paypalOnError(err)}
                  onCancel={(err) => this.paypalOnError(err)}
                  style={{
                      shape: 'rect',
                      color: 'blue',
                      layout: 'vertical',
                      label: 'subscribe',
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
