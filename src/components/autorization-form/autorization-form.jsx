import React, {Component} from 'react'

export default class AutorizationForm extends Component {
  state = {
    email: 'testing3@mail.com',
    password: 'test1234',
    phone: '+7999999999'
  }
  submit = () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone
    }
    const myHeaders = new Headers()
    myHeaders.append('Content-type', 'application/json')
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