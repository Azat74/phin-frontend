import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import './components/autorization-form/autorization-form.jsx'
import AutorizationForm from './components/autorization-form/autorization-form.jsx';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <AutorizationForm/>
      </div>
    )
  }
}

export default App;
