import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    // console.log(jwtToken)

    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    // console.log(jwtToken)
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    // console.log(response)
    // console.log('Submitted')

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="input">
        <label htmlFor="username" className="username">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          type="text"
          onChange={this.onChangeUsername}
          className="username-input"
          placeholder="Username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input">
        <label htmlFor="password" className="username">
          PASSWORD
        </label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={this.onChangePassword}
          className="username-input"
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="background-container">
        <div className="card-container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="imgage"
            />
          </div>
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <div className="btn-container">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
