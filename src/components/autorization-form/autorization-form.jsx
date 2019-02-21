import React, { Component } from 'react'
const axios = require('axios')
const axios2 = require('axios')

export default class AutorizationForm extends Component {
  state = {
    email: `t${Date.now()}@mail.com`,
    password: 'test1234',
    phone: '+7999999999',
    token: ''
  }
  submit = () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-type', 'application/json')
    const JSONHeader = {'Content-type': 'application/json'};
    console.log(JSON.stringify(body))
    axios({
      method: 'post',
      url: 'http://localhost:3000/signup',
      headers: JSONHeader,
      data: JSON.stringify(body)
    })
      .then(response => {
        if (response.status === 200) {
          const thisReturn = JSON.parse(response.request.response)
          return thisReturn
        }
      })
      .then(confirmCode => {
        console.log(confirmCode)
        const requestBody = JSON.stringify({
          email: body.email,
          confirmCode: `${confirmCode.confirmCode}`
        })
        console.log(requestBody)
        axios({
          method: 'post',
          url: 'http://localhost:3000/confirmation',
          headers: JSONHeader,
          data: requestBody
        })
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              const requestBody = JSON.stringify({email: body.email, password: body.password});
              console.log(requestBody)
              axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                headers: JSONHeader,
                data: requestBody
              })
                .then(res => {
                  console.log(res);
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
          })
      })
  }
  submit1 = () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-type', 'application/json')
    console.log(JSON.stringify(body))
    window.fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(res => {
        if (res) {
          console.log(res)
          console.log(JSON.stringify({
            email: body.email,
            confirmCode: `${res.confirmCode}`
          }))
          window.fetch('http://localhost:3000/confirmation', {
            method: 'POST',
            body: JSON.stringify({
              email: body.email,
              confirmCode: `${res.confirmCode}`
            }),
            headers: myHeaders
          })
            .then(res => {
              console.log(res)
              console.log(JSON.stringify({ email: body.email, password: body.password }))
              if (res.status === 200) {
                window.fetch('http://localhost:3000/login', {
                  method: 'POST',
                  body: JSON.stringify({
                    email: body.email,
                    password: body.password
                  }),
                  headers: myHeaders
                })
                  .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                      return res.text()
                    }
                  })
                  .then(res => {
                    console.log(res)
                    this.setState(() => {
                      this.props.toggleLogin()
                      return {
                        token: res
                      }
                    })
                  })
              }
            })
        }
      })
      .catch(e => console.error(e))
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
  render() {
    return (
      <div className='autorization-form'>
        <input type='email' defaultValue={this.state.email} onChange={this.handleChangeEmail} />
        <input type='password' defaultValue={this.state.password} onChange={this.handleChangePassword} />
        <input type='tel' defaultValue={this.state.phone} onChange={this.handleChangePhone} />
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}