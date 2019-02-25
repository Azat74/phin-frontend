import React, { Component } from 'react'

export default function ErrorNode (props) {
    return <div className='error-node'>{props.errorMsg}</div>
}