import React, {Component} from 'react'

export default class LK extends Component {
  render () {
    return (
      <div className='lk'>
        <div>is login!</div>
        <button onClick={this.props.logout} className='lk__logout'>logout</button>
      </div>
    )
  }
}