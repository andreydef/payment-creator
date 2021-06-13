import React, { Component } from "react"
import { connect } from "react-redux"

import { setCurrentUser } from "../../../actions/authActions"

import "./Profile.css"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        profile: [],
        orders: []
    }
  }

  async componentDidMount() {
    await this.props.setCurrentUser();

    fetch('/api/orders')
      .then(res => res.json())
      .then(result => {
         this.setState({ orders: result })
          console.log(result)
      })
  }

  render() {
    const { orders } = this.state;

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
              <table key={orders.paymentID}>
                  <tbody>
                  <tr>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Payment type</th>
                      <th>Created at</th>
                  </tr>
                  { orders ? (
                      orders.map(orders => (
                          <tr>
                              <td>{orders.product.productName}</td>
                              <td>{orders.product.productBrand}</td>
                              <td>{orders.product.productCategory}</td>
                              <td>{orders.paymentAmount}</td>
                              <td>{orders.paymentType}</td>
                              <td>{orders.createdAt}</td>
                          </tr>
                      ))
                  ) :  <p>You don't have orders</p> }
                  </tbody>
              </table>

          </center>
        </div>
      );
    } else return <div>You are not logged!</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Profile);
