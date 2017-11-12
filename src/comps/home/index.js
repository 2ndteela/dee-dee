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

    render() {
    return (
    <div>
        <h1 className='header'>D and D</h1>
        <div className ='col-12 full-pad home-card'>
            <NavLink id='new-guy' to={`/character-select`} >Saved</NavLink>
            <div className='line col-11'></div>
            <NavLink id='new-guy' to='/character-new'>Create New Charater</NavLink>
        </div>
        <button onClick={()=> clear()}>Clear Stash</button>
    </div>
    )
}
}

export default Home