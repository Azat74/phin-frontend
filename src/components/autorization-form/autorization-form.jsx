import React, { Component } from 'react'
import ErrorNode from '../error-node/error-node'
const axios = require('axios')

export default class AutorizationForm extends Component {
  state = {
    email: '',
    password: '',
    phone: '',
    reg: false,
    error: false,
    token: ''
  }
  submit = async e => {
    e.preventDefault()
    const body = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone
    }
    const JSONHeader = { 'Content-type': 'application/json' };
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
    // send ConfirmCode
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
    // login form
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: JSONHeader,
      data: JSON.stringify({
        email: body.email, password: body.password
      })
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          this.props.toggleLogin()
          this.props.setToken(res.data)
        }
      })
      .catch(e => {
        console.log(e)
        console.log('Неверный логин или пароль')
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
      return { ...state, reg: true }
    })
  }
  render() {
    let inputTel = null
    if (this.state.reg === true) {
      inputTel = <input required type='tel' defaultValue={this.state.phone} onChange={this.handleChangePhone} />
    }
    return (
      <div className='autorization-form'>
        <ErrorNode error={'Неправильный логин или пароль'}/>
        <form onSubmit={this.submit}>
          <input required type='email' defaultValue={this.state.email} onChange={this.handleChangeEmail} />
          <input required type='password' defaultValue={this.state.password} onChange={this.handleChangePassword} />
          {inputTel}
          <button>submit</button>
        </form>
        <a href="/registration" onClick={this.handleRegActivate}>Еще не зарегестрированы?</a>
      </div>
    )
  }
}