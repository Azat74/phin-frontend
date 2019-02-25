import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import './components/autorization-form/autorization-form.jsx'
import AutorizationForm from './components/autorization-form/autorization-form.jsx';
import LK from './components/lk/lk.jsx';
import NightToggler from './components/night-toggler/night-toggler'
const axios = require('axios')

class App extends Component {
  state = {
    isLogin: false,
    token: ''
  }
  
  componentDidMount() {
    if (localStorage.token) {
      this.setState(state => {
        return {
          ...state,
          token: localStorage.token,
          isLogin: true
        }
      })
    }
    axios({
      method: 'get',
      url: 'http://localhost:3000/appointments',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then(response => {
        console.log(response)
      })
  }
  toggleLogin = () => {
    this.setState(state => {
      return {
        ...state,
        isLogin: !state.isLogin
      }
    });
  }
  setToken = token => {
    this.setState(state => {
      localStorage.token = token
      return {
        ...state,
        token: token
      }
    })
  }
  logout = () => {
    this.setState(state => {
      localStorage.removeItem('token')
      return {
        ...state,
        isLogin: false,
        token: ''
      }
    })
  }
  render() {
    return (
      <div className='app'>
        {!this.state.isLogin ? <AutorizationForm setToken={this.setToken} toggleLogin={this.toggleLogin}/> :
        <LK logout={this.logout}/>}
        <NightToggler/>
      </div>
    )
  }
}

export default App;
