import React from 'react'
import './style.css'

const Home = () => {
    return (
    <div>
        <h1 className='header'>D and D</h1>
        <div className ='col-12 full-pad home-card'>
            <h2>Enter your password and look through existing Characters</h2>
            <input type='text' className='col-11' />
            <button>Find</button>
            <div className='line col-11'></div>
            <button>Create New Charater</button>
        </div>
    </div>
    )
}

export default Home