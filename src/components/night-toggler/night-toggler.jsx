import React, { Component } from 'react'

export default function NightToggler () {
    setTimeout(() => {
        if (!localStorage.nightMode) {
            localStorage.nightMode = 'false'
        }
        console.log('init')
        if (localStorage.nightMode === 'true') {
            document.body.classList.add('js-night-mode')
            document.querySelector('.night-toggler').classList.add('active')
        } else {
            document.body.classList.remove('js-night-mode')
            document.querySelector('.night-toggler').classList.remove('active')
        }
    })
    const toggle = () => {
        if (localStorage.nightMode === 'true') {
            localStorage.nightMode = 'false'
            document.body.classList.remove('js-night-mode')
            document.querySelector('.night-toggler').classList.remove('active')
        } else if (localStorage.nightMode === 'false') {
            localStorage.nightMode = 'true'
            document.body.classList.add('js-night-mode')
            document.querySelector('.night-toggler').classList.add('active')
        }
    }
    return <button className='night-toggler' onClick={toggle}></button>
}