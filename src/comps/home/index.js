import React, {Component} from 'react'
import './style.css'
import {NavLink} from 'react-router-dom'

function clear() {
    localStorage.clear()
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: ''
        }
    }

    keUp() {
        const val = document.querySelector('input').value
        this.setState({
            password: val
        })
    }

    render() {
    return (
    <div>
        <h1 className='header'>D and D</h1>
        <div className ='col-12 full-pad home-card'>
            <h2>Enter your password and look through existing Characters</h2>
            <input onChange={()=> this.keUp()} type='text' className='col-11' />
            <NavLink id='new-guy' to={`/character-select/${this.state.password}`} >Find</NavLink>
            <div className='line col-11'></div>
            <NavLink id='new-guy' to='/character-new'>Create New Charater</NavLink>
        </div>
        <button onClick={()=> clear()}>Clear Stash</button>
    </div>
    )
}
}

export default Home