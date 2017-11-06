import React from 'react'
import './style.css'
import {NavLink} from 'react-router-dom'

function CheckChar() {
    const name = document.querySelector('input').value
    const guy = localStorage.getItem(name)
    if(guy) {
        console.log(JSON.parse(guy))
    }
    else {
        console.log("I haven't heard that name in years")
    }
}

function clear() {
    localStorage.clear()
}

const Home = () => {
    return (
    <div>
        <h1 className='header'>D and D</h1>
        <div className ='col-12 full-pad home-card'>
            <h2>Enter your password and look through existing Characters</h2>
            <input type='text' className='col-11' />
            <button onClick={() => CheckChar()}>Find</button>
            <div className='line col-11'></div>
            <NavLink id='new-guy' to='/character-new'>Create New Charater</NavLink>
        </div>
        <button onClick={()=> clear()}>Clear Stash</button>
    </div>
    )
}

export default Home