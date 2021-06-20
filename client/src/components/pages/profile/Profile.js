import React, { Component } from "react"
import { connect } from "react-redux"

import { setCurrentUser } from "../../../actions/authActions"

import "./Profile.css"
import Button from "@material-ui/core/Button";
import axios from "axios";
import Loader from "react-loader-spinner";
import moment from "moment";

const clientIdAndSecret = "AZRtameGwLo6f_zKc73fnXRoR8zZX-dFzlHci18FIXRUlMY2rtdpZVPnXyYx5QhMDcZ0sE9tjDuDKSRR:EFNN_2R8YDxUuo2z-OufYMB1B2VTFRoAaWwIRh9Nc16yeQnRxMz16P-RF5gb0ZIxcfofzXY9T3qKMfsM";
const base64 = Buffer.from(clientIdAndSecret).toString('base64')

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        orders: [],
        subscriptionID: '',
        isLoaded: false
    }
  }

  async componentDidMount() {
    await this.props.setCurrentUser();

    fetch('/api/orders')
      .then(res => res.json())
      .then(result => {
         this.setState({ orders: result })
      })

      fetch('/api/subscribe/cancel')
          .then(res => res.json())
          .then(result => {
              this.setState({ subscriptionID: result.subscriptionID })
          })
  }

  render() {
    const { orders, subscriptionID } = this.state;

    const sendDeleteStripe = async (paymentID) => {
        fetch(`/api/stripe-subscribe/${paymentID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.status === 403 || response.status === 422) {
                alert(response.data.message)
            }
            return response.json();
        }).then(async (data) => {
            this.setState({
                orders: data,
                isLoaded: true
            });
        }).catch(function(err) {
            console.log(err)
        });
    }

    const sendDeletePayPal = (paymentID) => {
        fetch(`/api/paypal-subscribe/${paymentID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            if (response.status >= 400) {
                Promise.reject(new Error("Bad response from server"));
            }
            return response.json();
        }).then(async (data) => {
            this.setState({
                orders: data,
                isLoaded: true
            });
        }).catch(function(err) {
            console.log(err)
        });

        fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Language': 'en_US',
                'Authorization': `Basic ${base64}`,
            },
            body: 'grant_type=client_credentials'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            axios({
                url: `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}/cancel`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${data.access_token}`
                },
                data: {
                    "reason": "Cancel product subscription"
                }
            }).then(res => {
                console.log(`Axios Call completed: ${res}`)
                return fetch(`/api/paypal-subscribe/${paymentID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function(res) {
                    return res.json();
                }).catch(err => console.log(err))
            })
        }).catch(function() {
            console.log("couldn't get auth token");
            alert('couldn\'t get auth token')
        });
    }

    const getSubscribeButton = (order) => {
        if (order.paymentType === 'Stripe Subscribe'
            && order.status === 'Subscribe')
        {
            return (
                <td>
                    <Button variant="contained" color="primary" className='button' onClick={() => sendDeleteStripe(order.paymentID)}>
                        Delete Stripe Subscribe
                    </Button>
                </td>
            )
        } else if (order.paymentType === 'PayPal Subscribe'
            && order.status === 'Subscribe') {
            return (
                <td>
                    <Button variant="contained" color="primary" className='button'
                            onClick={() => sendDeletePayPal(order.paymentID)}>
                        Delete Paypal Subscribe
                    </Button>
                </td>
            )
        } else if (order.status === 'Cancel subscription') {
            return (
                <td>Cancel subscription</td>
            )
        } else {
            return (
                <td>Payment</td>
            )
        }
    }

    if (this.props.auth.isAuthenticated) {
        if (this.state.isLoaded === true) {
            setTimeout(() => {
                window.location.reload(false)
            },3000)

            return (
                <center>
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </center>
            )
        } else {
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
                                            <td>{moment(order.createdAt)
                                                .format('DD MMM, YYYY - HH:mm')}</td>
                                            { getSubscribeButton(order) }
                                        </tr>
                                    </>
                                ))
                            ) : <p>You don't have orders</p> }
                            </tbody>
                        </table>
                    </center>
                </div>
            )
        }
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
