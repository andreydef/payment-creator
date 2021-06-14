import React, { Component } from "react"
import { connect } from "react-redux"

import { setCurrentUser } from "../../../actions/authActions"

import "./Profile.css"
import Button from "@material-ui/core/Button";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orders: []
    }
  }

  async componentDidMount() {
    await this.props.setCurrentUser();

    fetch('/api/orders')
      .then(res => res.json())
      .then(result => {
         this.setState({ orders: result })
      })
  }

  render() {
    const { orders } = this.state;

    function sendDeleteStripe() {
        // return fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         type: 'delete'
        //     })
        // }).then(function(res) {
        //     return res.json();
        // }).catch(err => console.log(err))
    }

    function getSubscribeButton(orders) {
        if (orders.paymentType === 'Stripe Subscribe')
        {
            return (
                <td>
                    <Button variant="contained" color="primary" className='button' onClick={sendDeleteStripe}>
                        Delete Stripe Subscribe
                    </Button>
                </td>
            )
        } else if (orders.paymentType === 'PayPal Subscribe') {
            return (
                <td>
                    <Button variant="contained" color="primary" className='button'>
                        Delete Paypal Subscribe
                    </Button>
                </td>
            )
        } else {
            return (
                <td>Payment</td>
            )
        }
    }

    function getUserOrders(orders, user) {
        if (orders.user === user.toString()) {
            return (
                <tr key={orders.paymentID}>
                    <td>{orders.product.productName}</td>
                    <td>{orders.product.productBrand}</td>
                    <td>{orders.product.productCategory}</td>
                    <td>{orders.paymentAmount}</td>
                    <td>{orders.paymentType}</td>
                    <td>{orders.createdAt}</td>
                    { getSubscribeButton(orders) }
                </tr>
            )
        }
    }

    if (this.props.auth.isAuthenticated) {
      return (
        <div className="jumbotron">
          <h2 className="display-4">Welcome {this.props.auth.user.name}!</h2>
          <hr className="my-4" />
          <p className="lead">You profile data:</p>
          <center>
            <ul>
              <img className="photo" src={this.props.auth.user.photo} alt="" />
              <li>Your Name: {this.props.auth.user.name}</li>
              <li>Your Email: {this.props.auth.user.email}</li>
            </ul>
              <h2>Orders</h2>
              <table>
                  <tbody>
                  <tr>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Payment type</th>
                      <th>Created at</th>
                      <th>Status</th>
                  </tr>
                  { orders ? (
                      orders.map(orders => (
                          <>
                              { getUserOrders(orders, this.props.auth.user._id) }
                          </>
                      ))
                  ) : <p>You don't have orders</p> }
                  </tbody>
              </table>
          </center>
        </div>
      );
    } else return <p>Loading...</p>
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Profile);
