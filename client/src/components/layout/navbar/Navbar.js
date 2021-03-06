import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/">
                  Products
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/description">
                  Descriptions
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/therms">
                  Therms
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/privacy-policy">
                  Privacy Policy
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/profile">
                  Profile
              </Link>
          </li>
          <li className="nav-item">
              <a href="/api/logout" className="nav-link">
                  <img
                      className="rounded-circle"
                      src={user.picture}
                      alt={user.name}
                      style={{ width: "25px", marginRight: "5px" }}
                      title="You must have a Gravatar connected to your email to display an image"
                  />
                  Logout
              </a>
          </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/description">
                  Descriptions
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/therms">
                  Therms
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/privacy-policy">
                  Privacy Policy
              </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/login">
                  Login
              </Link>
          </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Payment creator
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(Navbar);
