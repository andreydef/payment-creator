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

    const sendDeleteStripe = async (paymentID) => {
        alert('Cancel subscribe')
        return await fetch(`/api/subscribe/${paymentID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const getSubscribeButton = (order) => {
        if (order.paymentType === 'Stripe Subscribe')
        {
            return (
                <td>
                    <Button variant="contained" color="primary" className='button' onClick={() => sendDeleteStripe(order.paymentID)}>
                        Delete Stripe Subscribe
                    </Button>
                </td>
            )
        } else if (order.paymentType === 'PayPal Subscribe') {
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
                  { orders !== [] ? (
                      orders.map(order => (
                          <>
                              <tr key={order.paymentID}>
                                  <td>
                                      <a href={`/product/${order.product.productID}`}>
                                          {order.product.productName}
                                      </a>
                                  </td>
                                  <td>{order.product.productBrand}</td>
                                  <td>{order.product.productCategory}</td>
                                  <td>{order.paymentAmount}</td>
                                  <td>{order.paymentType}</td>
                                  <td>{order.createdAt}</td>
                                  { getSubscribeButton(order) }
                              </tr>
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
