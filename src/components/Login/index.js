import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  onChangeUserName = event => this.setState({userName: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onLoginSuccess = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 1})
  }

  onLoginFailure = data => {
    const resposeText = data.error_msg
    this.setState({errorMsg: resposeText})
  }

  LoginApiCall = async event => {
    event.preventDefault()
    const {userName, password} = this.state

    const userDetails = {
      username: userName,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data)
    } else {
      this.onLoginFailure(data)
    }
  }

  LoginForm = () => {
    const {userName, password, errorMsg} = this.state

    const pClass = errorMsg === '' ? `error-ele hide-error` : 'error-ele'

    return (
      <form className="login-form" onSubmit={this.LoginApiCall}>
        <h1 className="loin-txt">Login</h1>
        <label htmlFor="user-name" className="label">
          USERNAME
        </label>
        <input
          onChange={this.onChangeUserName}
          type="text"
          className="input-ele"
          id="user-name"
          value={userName}
        />
        <div className="p-div">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            onChange={this.onChangePassword}
            type="password"
            className="input-ele"
            id="user-name"
            value={password}
          />
        </div>
        <p className={pClass}>{errorMsg}</p>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    )
  }

  render() {
    return (
      <div className="login-bg">
        <h1 className="heading">Movies</h1>
        {this.LoginForm()}
      </div>
    )
  }
}

export default Login
