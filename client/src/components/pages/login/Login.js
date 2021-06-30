import React from "react"

import './Login.css'

class Login extends React.Component {
  render() {
      return (
          <div className="landing">
              <div className="dark-overlay landing-inner text-light">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-12 text-center">
                              <h2 className="display-3 mb-4">Login</h2>
                              <hr />
                              <div className="google-btn-container">
                                  <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle&client_id=365492858948-jkojl4qtpssh4i4uu2d3cstdjmentekl.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
                                      <div className="google-btn">
                                          <div className="google-icon-wrapper">
                                              <img
                                                  className="google-icon"
                                                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                                  alt="signin"
                                              />
                                          </div>
                                          <p className="btn-text">
                                              <b>Google</b>
                                          </p>
                                      </div>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
}

export default Login
