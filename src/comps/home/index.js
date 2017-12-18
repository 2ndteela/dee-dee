import React, {Component} from 'react'
import './style.css'
import {NavLink} from 'react-router-dom'

function clear() {
    localStorage.clear()
}

function print() {
    const stuff = JSON.parse(localStorage.getItem('characters'))
    console.log(stuff)
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: ''
        }
    this.updatePassword = this.updatePassword.bind(this)
    }

    updatePassword (e) {
        this.setState({
            password: e.target.value
        })
    }
    render() {
    return (
    <div>
        <h1 className='header'>D and D</h1>
        <div className ='col-12 full-pad home-card'>
            <input placeholder='password' value={this.state.password} onChange={this.updatePassword} />
            <NavLink id='new-guy' to={`/character-select/${this.state.password}`} >Saved</NavLink>
            <div className='line col-11'></div>
            <NavLink id='new-guy' to='/character-new'>Create New Charater</NavLink>
        </div>
        <button onClick={()=> clear()}>Clear Stash</button>
        <button onClick={() => print()}>Print</button>
    </div>
    )
}
}

export default Home