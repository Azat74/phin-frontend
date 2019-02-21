import React, { Component } from 'react'
const axios = require('axios')

export default class AutorizationForm extends Component {
  state = {
    email: '',
    password: '',
    phone: '',
    reg: false,
    token: ''
  }
  submit = async () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone
    }
    const JSONHeader = { 'Content-type': 'application/json' };
    console.log(JSON.stringify(body))
    // registration and get ConfirmCode
    function registration() {
      return new Promise((pResolve) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/signup',
          headers: JSONHeader,
          data: JSON.stringify(body)
        })
          .then(response => {
            if (response.status === 200) {
              const thisReturn = JSON.parse(response.request.response)
              console.log(thisReturn.confirmCode)
              pResolve(thisReturn.confirmCode)
            }
          })
      })
    }
    async function confirmation() {
      const getConfirmationCode = await registration()
      return new Promise((pResolve) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/confirmation',
          headers: JSONHeader,
          data: JSON.stringify({
            email: body.email,
            confirmCode: `${getConfirmationCode}`
          })
        })
          .then(res => {
            if (res.status === 200) {
              pResolve(true)
            }
          })
      })
    }
    if (this.state.reg === true) {
      await confirmation()
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: JSONHeader,
      data: JSON.stringify({
        email: body.email, password: body.password
      })
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          this.setState(() => {
            this.props.toggleLogin()
            return {
              token: res
            }
          })
        }
      })
  }
  handleChangeEmail = e => {
    const email = e.target.value
    this.setState(() => { return { email } })
  }
  handleChangePassword = e => {
    const password = e.target.value
    this.setState(() => { return { password } })
  }
  handleChangePhone = e => {
    const tel = e.target.value
    this.setState(() => { return { tel } })
  }
  handleRegActivate = e => {
    e.preventDefault()
    this.setState(state => {
      { return { ...state, reg: true } }
    })
  }
  render() {
    let inputTel = null
    if (this.state.reg === true) {
      inputTel = <input type='tel' defaultValue={this.state.phone} onChange={this.handleChangePhone} />
    }
    return (
      <div className='autorization-form'>
        <form onSubmit={e => e.preventDefault()}>
          <input type='email' defaultValue={this.state.email} onChange={this.handleChangeEmail} />
          <input type='password' defaultValue={this.state.password} onChange={this.handleChangePassword} />
          {inputTel}
          <button onClick={this.submit}>submit</button>
        </form>
        <a href="/registration" onClick={this.handleRegActivate}>Еще не зарегестрированы?</a>
      </div>
    )
  }
}