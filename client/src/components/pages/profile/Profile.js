import React, { Component } from "react"
import { connect } from "react-redux"

import { setCurrentUser } from "../../../actions/authActions"
import { setUserOrders } from '../../../actions/ordersActions'

import "./Profile.css"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  async componentDidMount() {
    await this.props.setCurrentUser();
    await this.props.setUserOrders();
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
              <img className="photo" src={this.props.auth.user.photo} alt="" />
              <li>Your Name: {this.props.auth.user.name}</li>
              <li>Your Email: {this.props.auth.user.email}</li>
            </ul>
            <table>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Payment type</th>
                <th>Payment amount</th>
                <th>Created at</th>
              </tr>
              <tr>
                <td>{this.props.orders.productName}</td>
                <td>{this.props.orders.productBrand}</td>
                <td>{this.props.orders.productCategory}</td>
                <td>{this.props.orders.price}</td>
                <td>{this.props.orders.payment_type}</td>
                <td>{this.props.orders.paymentAmount}</td>
                <td>{this.props.orders.createdAt}</td>
              </tr>
            </table>
            {/*{ this.props.orders === {} ?  (*/}
            {/*    <table>*/}
            {/*      <tr>*/}
            {/*        <th>Name</th>*/}
            {/*        <th>Brand</th>*/}
            {/*        <th>Category</th>*/}
            {/*        <th>Price</th>*/}
            {/*        <th>Payment type</th>*/}
            {/*        <th>Payment amount</th>*/}
            {/*        <th>Created at</th>*/}
            {/*      </tr>*/}
            {/*      <tr>*/}
            {/*        <td>{this.props.orders.productName}</td>*/}
            {/*        <td>{this.props.orders.productBrand}</td>*/}
            {/*        <td>{this.props.orders.productCategory}</td>*/}
            {/*        <td>{this.props.orders.price}</td>*/}
            {/*        <td>{this.props.orders.payment_type}</td>*/}
            {/*        <td>{this.props.orders.paymentAmount}</td>*/}
            {/*        <td>{this.props.orders.createdAt}</td>*/}
            {/*      </tr>*/}
            {/*    </table>*/}
            {/*) : <p>You not have orders</p>*/}
            {/*}*/}
          </center>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  orders: state.orders.orders
});

export default connect(
  mapStateToProps,
  { setCurrentUser, setUserOrders }
)(Profile);
