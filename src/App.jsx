import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import './components/autorization-form/autorization-form.jsx'
import AutorizationForm from './components/autorization-form/autorization-form.jsx';
import LK from './components/lk/lk.jsx';
import NightToggler from './components/night-toggler/night-toggler'

class App extends Component {
  state = {
    isLogin: false,
    token: ''
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
      return {
        ...state,
        token: token
      }
    })
  }
  render() {
    return (
      <div className='app'>
        {!this.state.isLogin ? <AutorizationForm setToken={this.setToken} toggleLogin={this.toggleLogin}/> : <LK/>}
        <NightToggler/>
      </div>
    )
  }
}

export default App;
