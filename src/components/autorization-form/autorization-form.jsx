import React, {Component} from 'react'

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
    console.log(JSON.stringify(body));
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: myHeaders
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          return response.json()
        }        
      })
      .then(res => {
        if (res) {
          console.log(res)
          console.log(JSON.stringify({
            email: body.email,
            confirmCode: `${res.confirmCode}`
          }))
          fetch('http://localhost:3000/confirmation', {
            method: 'POST',
            body: JSON.stringify({
              email: body.email,
              confirmCode: `${res.confirmCode}`
            }),
            headers: myHeaders
          })
            .then(res => {
              console.log(res)
              console.log(JSON.stringify({email: body.email, password: body.password}))
              if (res.status === 200) {
                fetch('http://localhost:3000/login', {
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
                    this.setState(() => {
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
    this.setState(() => {return {email}})
  }
  handleChangePassword = e => {
    const password = e.target.value
    this.setState(() => {return {password}})
  }
  handleChangePhone = e => {
    const tel = e.target.value
    this.setState(() => {return {tel}})
  }
  render () {
    return (
      <div className='autorization-form'>
        <input type='email' defaultValue={this.state.email} onChange={this.handleChangeEmail}/>
        <input type='password' defaultValue={this.state.password} onChange={this.handleChangePassword}/>
        <input type='tel' defaultValue={this.state.phone} onChange={this.handleChangePhone}/>
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}