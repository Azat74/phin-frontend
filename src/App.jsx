import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import './components/autorization-form/autorization-form.jsx'
import AutorizationForm from './components/autorization-form/autorization-form.jsx';
import LK from './components/lk/lk.jsx';

class App extends Component {
  state = {
    isLogin: false
  }
  toggleLogin = () => {
    this.setState(state => {
      return {
        isLogin: !state.isLogin
      }
    });
  }
  render() {
    return (
      <div className='app'>
        {!this.state.isLogin ? <AutorizationForm toggleLogin={this.toggleLogin}/> : <LK/>}
      </div>
    )
  }
}

export default App;
