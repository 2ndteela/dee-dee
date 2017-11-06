import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

class ViewCharater extends Component {
    render() {
        const word = this.props.match.params.password
        const list = JSON.parse(localStorage.getItem(word))
        const guy = list[this.props.match.params.index]
        return <h1 className='header'>{guy.name}</h1>
    }
}

export default ViewCharater